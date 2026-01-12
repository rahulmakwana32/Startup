from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from langchain_core.messages import HumanMessage
from app.agents.graph import graph
from app.config import get_settings

router = APIRouter()
settings = get_settings()

class AgentRequest(BaseModel):
    query: str
    thread_id: str | None = None

class AgentResponse(BaseModel):
    response: str
    thread_id: str
    agent_trace: list[str] | None = None

@router.post("/chat", response_model=AgentResponse)
async def chat_with_agents(request: AgentRequest):
    """
    Interact with the Piyog Multi-Agent System.
    """
    try:
        # Initial message to start the graph
        inputs = {"messages": [HumanMessage(content=request.query)]}
        
        # Invoke the graph with configuration for memory
        thread_id = request.thread_id or "default_thread"
        config = {"configurable": {"thread_id": thread_id}}
        
        result = graph.invoke(inputs, config=config)
        
        # Extract the full conversation history
        trace = []
        for msg in result["messages"]:
            role = "User" if isinstance(msg, HumanMessage) else "Agent"
            # Try to identify specific agents if possible, or just use content
            trace.append(f"> {role}: {msg.content}")

        last_message = result["messages"][-1]
        content = last_message.content
        if isinstance(content, list):
            # Extract text from parts if they are dicts or objects
            text_parts = []
            for part in content:
                if isinstance(part, dict) and "text" in part:
                    text_parts.append(part["text"])
                elif hasattr(part, "text"):
                    text_parts.append(part.text)
                else:
                    text_parts.append(str(part))
            content = " ".join(text_parts)
        
        return AgentResponse(
            response=str(content),
            thread_id=request.thread_id or "new_thread",
            agent_trace=trace
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/graph")
async def get_graph_visualization():
    """
    Returns the graph structure for visualization on the frontend.
    """
    return graph.get_graph().draw_mermaid()

from app.db import get_all_agent_statuses
@router.get("/status")
async def get_agent_statuses():
    """
    Returns real-time status of all agents.
    """
    return get_all_agent_statuses()
