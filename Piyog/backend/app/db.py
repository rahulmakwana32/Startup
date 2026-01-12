from typing import Dict, List, Optional
from pydantic import BaseModel
from datetime import datetime

class AgentTask(BaseModel):
    description: str
    steps: List[str]
    status: str = "PENDING"  # PENDING, IN_PROGRESS, COMPLETED
    timestamp: datetime = datetime.now()

class AgentStatus(BaseModel):
    name: str
    status: str = "IDLE"  # IDLE, BUSY
    current_task: Optional[AgentTask] = None

# Global in-memory store
# Key: Agent Name (lowercase), Value: AgentStatus
_agent_store: Dict[str, AgentStatus] = {
    "manager": AgentStatus(name="Manager"),
    "registrar": AgentStatus(name="Registrar"),
    "strategist": AgentStatus(name="Strategist"),
    "sourcing": AgentStatus(name="Sourcing"),
    "designer": AgentStatus(name="Designer"),
    "engineer": AgentStatus(name="Engineer"),
    "director": AgentStatus(name="Director"),
}

def get_agent_status(agent_name: str) -> AgentStatus:
    return _agent_store.get(agent_name.lower(), AgentStatus(name=agent_name))

def get_all_agent_statuses() -> Dict[str, AgentStatus]:
    return _agent_store

def set_agent_busy(agent_name: str, task_desc: str, steps: List[str] = []):
    agent_name = agent_name.lower()
    if agent_name in _agent_store:
        _agent_store[agent_name].status = "BUSY"
        _agent_store[agent_name].current_task = AgentTask(
            description=task_desc,
            steps=steps,
            status="IN_PROGRESS",
            timestamp=datetime.now()
        )

def set_agent_idle(agent_name: str):
    agent_name = agent_name.lower()
    if agent_name in _agent_store:
        _agent_store[agent_name].status = "IDLE"
        if _agent_store[agent_name].current_task:
             _agent_store[agent_name].current_task.status = "COMPLETED"
