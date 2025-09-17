# agent.py
from typing import List, Dict
from sim import RailSim
from tools import build_tools

def greedy_controller(sim):
    actions = []
    conflicts = sim.detect_conflicts_next()
    if conflicts:
        t1, t2 = (sim.trains[conflicts[0]["pair"][0]], sim.trains[conflicts[0]["pair"][1]])
        # pick winner by (priority, sooner ETA)
        e1, e2 = t1.eta_to_junction_s, t2.eta_to_junction_s
        key1, key2 = (t1.priority, -(e1 or 99999)), (t2.priority, -(e2 or 99999))
        winner, loser = (t1, t2) if key1 >= key2 else (t2, t1)

        # add HOLD only if needed
        desired_hold = 120
        remaining = max(0, loser.hold_until_ts - sim.now)
        if remaining < desired_hold - 10:
            actions.append({"train_id": loser.id, "type": "HOLD", "seconds": desired_hold})

        # add PROCEED only if not at platform and not held
        if not winner.at_platform and winner.hold_until_ts <= sim.now:
            actions.append({"train_id": winner.id, "type": "PROCEED"})
    else:
        # only nudge trains that are not at platform and not held
        for t in sim.trains.values():
            if not t.done and not t.at_platform and t.hold_until_ts <= sim.now:
                actions.append({"train_id": t.id, "type": "PROCEED"})
    return actions

def build_agent_tools(sim: RailSim):
    return build_tools(sim)
