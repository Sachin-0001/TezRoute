from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
from sim import RailSim
from agent import greedy_controller


app = FastAPI(title="Railway Station Simulator API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Single in-memory simulator instance (initialized via /init)
SIM: Optional[RailSim] = None
DEFAULT_TOPO = "data/topology.json"
DEFAULT_TT = "data/timetable.csv"


class InitRequest(BaseModel):
    topology_path: Optional[str] = None
    timetable_path: Optional[str] = None
    start_ts: int = 0


class Action(BaseModel):
    train_id: str
    type: str
    seconds: Optional[int] = None
    platform: Optional[str] = None


class StepRequest(BaseModel):
    seconds: int = 5


class ActionsRequest(BaseModel):
    actions: List[Action]


@app.post("/init")
def init_sim(req: InitRequest):
    global SIM
    topo = req.topology_path or DEFAULT_TOPO
    tt = req.timetable_path or DEFAULT_TT
    SIM = RailSim(topo, tt, start_ts=req.start_ts)
    return {"ok": True, "state": SIM.snapshot(), "kpis": SIM.kpis()}


def _require_sim():
    if SIM is None:
        return {"ok": False, "error": "Simulator not initialized. POST /init first."}
    return None


@app.get("/state")
def get_state():
    err = _require_sim()
    if err:
        return err
    return {"ok": True, "state": SIM.snapshot(), "kpis": SIM.kpis()}


@app.get("/conflicts")
def get_conflicts():
    err = _require_sim()
    if err:
        return err
    return {"ok": True, "conflicts": SIM.detect_conflicts_next()}


@app.post("/greedy_actions")
def get_greedy_actions():
    err = _require_sim()
    if err:
        return err
    actions = greedy_controller(SIM)
    return {"ok": True, "actions": actions}


@app.post("/actions")
def apply_actions(req: ActionsRequest):
    err = _require_sim()
    if err:
        return err
    SIM.apply_actions([a.model_dump() for a in req.actions])
    return {"ok": True, "state": SIM.snapshot()}


@app.post("/step")
def step(req: StepRequest):
    err = _require_sim()
    if err:
        return err
    SIM.step(req.seconds)
    return {"ok": True, "state": SIM.snapshot(), "kpis": SIM.kpis()}


# Convenience root
@app.get("/")
def root():
    return {"service": "Railway Station Simulator API", "endpoints": ["/init", "/state", "/conflicts", "/greedy_actions", "/actions", "/step"]}