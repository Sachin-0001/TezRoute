# run_demo.py
import json, time, os
from datetime import datetime
from sim import RailSim
from agent import build_agent_tools, greedy_controller

def pretty(d): print(json.dumps(d, indent=2))

if __name__ == "__main__":
    log_name = f"rail_run_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
    sim = RailSim("data/topology.json", "data/timetable.csv", start_ts=0, log_path=log_name)
    tools = build_agent_tools(sim)

    print(f"=== logging to {log_name} ===")
    print("=== initial state ===")
    pretty(tools.get_state.invoke({}))

    horizon_s = 600
    next_plan_ts = 0
    while sim.now < horizon_s:
        if sim.now >= next_plan_ts:
            conf = tools.predict_conflicts.invoke({})
            print(f"\n[t={sim.now}] predicted conflicts:"); pretty(conf)

            actions = greedy_controller(sim)
            print(f"[t={sim.now}] proposed actions:"); pretty(actions)

            ok = tools.safety_check_actions.invoke({"actions": actions})
            print(f"[t={sim.now}] safety: {ok}")
            if ok.get("ok"):
                applied = tools.apply_actions.invoke({"actions": actions})
                print(f"[t={sim.now}] applied:"); pretty(applied)

            # (optional) peek at last few events that were also written to file
            for ev in sim.log[-3:]:
                print(ev)

            next_plan_ts = sim.now + 30

        tick = tools.tick.invoke({"seconds": 5})
        k = tick["kpis"]
        print(f"[t={k['ts']}] KPIs: waiting={k['waiting']} on_plat={k['on_platform']} done={k['completed']}", end="\r")
        time.sleep(0.02)

        # End early if all trains finished
        if all(t["done"] for t in tick["state"]["trains"]):
            print("\nAll trains processed. Ending early.")
            break

    print("\n\n=== final KPIs ===")
    print(sim.kpis())
    print(f"\nLog written to: {log_name}")
