# sim.py
from __future__ import annotations
import json, math, time, os, random
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple

DT = 5  # seconds per tick
KPI_LOG_INTERVAL = 30  # seconds

@dataclass
class Train:
    id: str
    dir: str           # "UP" or "DN"
    priority: int      # 1 low (freight), 2 local, 3 express
    max_speed_kmph: float
    length_m: float
    dwell_s: int
    platform_pref: Optional[str] = None
    remaining_m: float = 2000.0  # distance to station throat

    # live state
    block: Optional[str] = None   # which approach block
    at_platform: Optional[str] = None
    arrived: bool = False
    done: bool = False
    speed_kmph: float = 0.0
    delay_s: int = 0
    eta_to_junction_s: Optional[int] = None
    planned_platform: Optional[str] = None
    hold_until_ts: int = 0

@dataclass
class Platform:
    id: str
    len_m: float
    occupied_until: int = 0
    occupant: Optional[str] = None

@dataclass
class Block:
    id: str
    dir: str
    headway_s: int
    line_speed_kmph: float
    last_clear_ts: int = 0
    occupant: Optional[str] = None

class RailSim:
    def __init__(self, topology_path: str, timetable_path: str, start_ts: int = 0, log_path: str = "rail_sim_log.txt"):
        with open(topology_path, "r") as f:
            topo = json.load(f)

        self.platforms: Dict[str, Platform] = {
            p["id"]: Platform(id=p["id"], len_m=p["len_m"], occupied_until=0, occupant=None)
            for p in topo["station"]["platforms"]
        }
        self.blocks: Dict[str, Block] = {
            b["id"]: Block(id=b["id"], dir=b["dir"], headway_s=b["headway_s"],
                           line_speed_kmph=b["line_speed_kmph"])
            for b in topo["blocks"]
        }
        self.conflicts = set(tuple(sorted(pair)) for j in topo["junctions"] for pair in j["conflicts"])
        self.now = start_ts
        self.trains: Dict[str, Train] = {}
        self.log: List[dict] = []

        # --- logging setup ---
        self.log_path = log_path
        # start a fresh log file
        try:
            with open(self.log_path, "w", encoding="utf-8") as lf:
                banner = {
                    "type": "SESSION_START",
                    "ts": self.now,
                    "topology_file": topology_path,
                    "timetable_file": timetable_path
                }
                lf.write(json.dumps(banner) + "\n")
        except Exception as e:
            print(f"[WARN] Could not open log file {self.log_path}: {e}")

        # Round-robin spawn across approach blocks (reduces instant conflicts)
        up_blocks  = [bid for bid in self.blocks if bid.startswith("B_UP")]
        dn_blocks  = [bid for bid in self.blocks if bid.startswith("B_DN")]
        up_i = dn_i = 0

        # load trains
        import csv
        with open(timetable_path, "r", newline="") as f:
            rdr = csv.DictReader(f)
            for row in rdr:
                t = Train(
                    id=row["train_id"],
                    dir=row["dir"],
                    priority=int(row["priority"]),
                    max_speed_kmph=float(row["max_speed_kmph"]),
                    length_m=float(row["length_m"]),
                    dwell_s=int(row["dwell_s"] or 0),
                    platform_pref=(row.get("platform_pref") or None),
                    speed_kmph=0.0,
                    # randomize a bit so arrivals are staggered
                    remaining_m=1800.0 + random.uniform(-200.0, 200.0)
                )
                if t.dir == "UP":
                    block = up_blocks[up_i % len(up_blocks)] if up_blocks else None
                    up_i += 1
                else:
                    block = dn_blocks[dn_i % len(dn_blocks)] if dn_blocks else None
                    dn_i += 1
                t.block = block
                self.trains[t.id] = t
                if block and self.blocks[block].occupant is None:
                    self.blocks[block].occupant = t.id
                self._log({"type": "TRAIN_LOAD", "train": t.id, "dir": t.dir,
                           "block": t.block, "remaining_m": t.remaining_m, "dwell_s": t.dwell_s})

    # ---------- logging ----------
    def _log(self, event: dict):
        """Append to in-memory log and write to disk as JSONL."""
        event = dict({"ts": self.now}, **event)
        self.log.append(event)
        try:
            with open(self.log_path, "a", encoding="utf-8") as lf:
                lf.write(json.dumps(event) + "\n")
        except Exception as e:
            # fall back silently; we still have in-memory
            pass

    # ---------- helpers ----------
    def _kmph_to_mps(self, v): return v * 1000/3600

    def predict_eta_to_station(self, train: Train) -> int:
        if train.at_platform or train.done:
            return 0
        remaining = max(0.0, train.remaining_m)
        # if no block (shouldn't happen), assume 60 km/h
        speed_cap = self.blocks[train.block].line_speed_kmph if train.block in self.blocks else 60.0
        v = min(train.max_speed_kmph, speed_cap)
        v_mps = max(1.0, self._kmph_to_mps(v * 0.8))  # 0.8 fudge factor
        return int(remaining / v_mps)

    def detect_conflicts_next(self) -> List[dict]:
        """if two opposite-dir trains ETA to the throat clash within headway -> conflict"""
        arrivals = []
        for t in self.trains.values():
            if t.done or t.at_platform:
                continue
            t.eta_to_junction_s = self.predict_eta_to_station(t)
            arrivals.append((t.id, t.dir, t.eta_to_junction_s))
        conflicts = []
        for i in range(len(arrivals)):
            for j in range(i+1, len(arrivals)):
                a, b = arrivals[i], arrivals[j]
                if a[1] == b[1]:  # only opposing directions
                    continue
                margin = abs(a[2]-b[2])
                if margin < 120:  # heuristic headway
                    conflicts.append({
                        "pair": (a[0], b[0]), "margin_s": margin,
                        "eta_s": (a[2], b[2])
                    })
        return sorted(conflicts, key=lambda x: x["margin_s"])

    # ---------- action application ----------
    def apply_actions(self, actions: List[dict]):
        for a in actions:
            t = self.trains[a["train_id"]]
            if a["type"] == "HOLD":
                desired = self.now + int(a.get("seconds", 60))
                # extend only (avoid stacking every replan)
                if desired > t.hold_until_ts:
                    t.hold_until_ts = desired
                    self._log({"type":"HOLD", "train":t.id, "until":t.hold_until_ts})
            elif a["type"] == "PLATFORM_CHANGE":
                t.planned_platform = a["platform"]
                self._log({"type":"PLAT_CHANGE", "train":t.id, "to":t.planned_platform})
            elif a["type"] == "PROCEED":
                # no-op for motion; just audit
                self._log({"type":"PROCEED", "train":t.id})

    # ---------- step the world ----------
    def step(self, seconds: int = DT):
        self.now += seconds
        for t in self.trains.values():
            if t.done:
                continue

            # Holding → no movement
            if t.hold_until_ts > self.now:
                t.speed_kmph = 0.0
                continue

            if not t.at_platform:
                # move towards station
                speed_cap = self.blocks[t.block].line_speed_kmph if t.block in self.blocks else 60.0
                t.speed_kmph = min(t.max_speed_kmph, speed_cap)
                v_mps = self._kmph_to_mps(t.speed_kmph)
                t.remaining_m = max(0.0, t.remaining_m - v_mps * seconds)

                # arrival & platform assignment
                if t.remaining_m <= 0.0:
                    candidate = t.planned_platform or t.platform_pref
                    if candidate and self._platform_free(candidate):
                        self._occupy_platform(t, candidate)
                    else:
                        free = next((p.id for p in self.platforms.values() if self._platform_free(p.id)), None)
                        if free:
                            self._occupy_platform(t, free)
                        else:
                            # no platform now → hold briefly & retry next ticks
                            t.hold_until_ts = self.now + 20
                            t.remaining_m = 0.0
                            self._log({"type":"HOLD_WAIT_PLATFORM", "train": t.id, "until": t.hold_until_ts})
            else:
                # dwell, then depart (for demo: journey ends here)
                plat = self.platforms[t.at_platform]
                if plat.occupied_until <= self.now:
                    plat.occupied_until = 0
                    plat.occupant = None
                    self._log({"type":"DEPARTED", "train": t.id, "platform": t.at_platform})
                    t.at_platform = None
                    t.done = True

        # periodic KPI heartbeat (not every tick to keep logs small)
        if self.now % KPI_LOG_INTERVAL == 0:
            self._log({"type":"KPI", **self.kpis()})

    def _platform_free(self, pid: str) -> bool:
        p = self.platforms[pid]
        return p.occupied_until <= self.now and p.occupant is None

    def _occupy_platform(self, t: Train, pid: str):
        p = self.platforms[pid]
        dwell = max(10, int(t.dwell_s))  # ensure we see it
        p.occupied_until = self.now + dwell
        p.occupant = t.id
        t.at_platform = pid
        t.speed_kmph = 0.0
        t.remaining_m = 0.0
        self._log({"type": "ARRIVE_PLAT", "train": t.id, "platform": pid, "dwell_s": dwell})

    # ---------- views ----------
    def snapshot(self) -> dict:
        return {
            "now": self.now,
            "platforms":[{"id":p.id,"occ":p.occupant,"until":p.occupied_until} for p in self.platforms.values()],
            "trains":[
                {"id":t.id,"dir":t.dir,"block":t.block,"at_platform":t.at_platform,
                 "eta_to_junc_s":self.predict_eta_to_station(t),"hold_until":t.hold_until_ts,
                 "done":t.done,"priority":t.priority}
                for t in self.trains.values()
            ]
        }

    def kpis(self) -> dict:
        waiting = sum(1 for t in self.trains.values() if (not t.done) and (t.hold_until_ts>self.now))
        on_plat = sum(1 for t in self.trains.values() if t.at_platform)
        completed = sum(1 for t in self.trains.values() if t.done)
        return {"ts": self.now, "waiting": waiting, "on_platform": on_plat, "completed": completed}
