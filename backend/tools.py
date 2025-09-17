# tools.py
from typing import List, Dict
from types import SimpleNamespace
from langchain_core.tools import tool
from sim import RailSim

def build_tools(sim: RailSim):
    """Return a namespace of LangChain Tool objects bound to this simulator via closures."""

    @tool("get_state")
    def get_state() -> dict:
        """Return current station state snapshot (platforms, trains)."""
        return sim.snapshot()

    @tool("predict_conflicts")
    def predict_conflicts() -> List[dict]:
        """Predict likely conflicts near the station throat based on crude ETAs."""
        return sim.detect_conflicts_next()

    @tool("safety_check_actions")
    def safety_check_actions(actions: List[Dict]) -> dict:
        """
        Check actions for trivial safety: platform existence & availability,
        and that HOLD times are positive. Returns {'ok': bool, 'reason': str}.
        """
        snap = sim.snapshot()
        plats = {p["id"]: p for p in snap["platforms"]}
        for a in actions:
            if a["type"] == "PLATFORM_CHANGE":
                pid = a["platform"]
                if pid not in plats:
                    return {"ok": False, "reason": f"platform {pid} not found"}
            elif a["type"] == "HOLD":
                if int(a.get("seconds", 0)) <= 0:
                    return {"ok": False, "reason": "non-positive hold duration"}
        return {"ok": True, "reason": "basic checks passed"}

    @tool("apply_actions")
    def apply_actions(actions: List[Dict]) -> dict:
        """Apply actions to the sim (HOLD/PROCEED/PLATFORM_CHANGE)."""
        sim.apply_actions(actions)
        return {"applied": len(actions), "state": sim.snapshot()}

    @tool("tick")
    def tick(seconds: int = 5) -> dict:
        """Advance simulation by N seconds (default 5). Returns KPIs."""
        sim.step(seconds)
        return {"kpis": sim.kpis(), "state": sim.snapshot()}

    @tool("comms_message")
    def comms_message(train_id: str, msg: str) -> dict:
        """Log a driver message (demo)."""
        sim.log.append({"ts": sim.now, "type": "COMMS", "train": train_id, "msg": msg})
        return {"ok": True}

    # Return something easy to dot-access in your script
    return SimpleNamespace(
        get_state=get_state,
        predict_conflicts=predict_conflicts,
        safety_check_actions=safety_check_actions,
        apply_actions=apply_actions,
        tick=tick,
        comms_message=comms_message,
    )
