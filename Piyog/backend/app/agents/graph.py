from typing import Literal
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.graph import StateGraph, END
from app.agents.state import AgentState
from app.agents.prompts import (
    REGISTRAR_PROMPT, STRATEGIST_PROMPT, SOURCING_LEAD_PROMPT,
    DESIGNER_PROMPT, ENGINEER_PROMPT, DIRECTOR_PROMPT, MANAGER_PROMPT
)
from app.llm import get_llm

llm = get_llm()

from app.db import set_agent_busy, set_agent_idle

def create_agent_node(prompt: str, name: str):
    """Factory to create an agent node function."""
    def agent_node(state: AgentState):
        # Update Status to BUSY
        set_agent_busy(name, f"Processing request from Manager", ["Thinking...", "Drafting response"])
        
        try:
            messages = state['messages']
            # Ensure system prompt is context
            response = llm.invoke([SystemMessage(content=prompt)] + messages)
            return {
                "messages": [response],
                "report": f"{name} contributed: {response.content[:50]}..."
            }
        finally:
            # Update Status to IDLE
            set_agent_idle(name)
            
    return agent_node

# Define Nodes
registrar = create_agent_node(REGISTRAR_PROMPT, "Registrar")
strategist = create_agent_node(STRATEGIST_PROMPT, "Strategist")
sourcing = create_agent_node(SOURCING_LEAD_PROMPT, "Sourcing Lead")
designer = create_agent_node(DESIGNER_PROMPT, "Designer")
engineer = create_agent_node(ENGINEER_PROMPT, "Engineer")
director = create_agent_node(DIRECTOR_PROMPT, "Director")

def manager(state: AgentState):
    """The Router (formerly Manager) decides which expert to call."""
    messages = state['messages']
    
    # The Router only needs to output the decision line
    response = llm.invoke([SystemMessage(content=MANAGER_PROMPT)] + messages)
    
    # Clean up response to ensure simple logging
    content = response.content
    if isinstance(content, list):
        text_parts = []
        for part in content:
            if isinstance(part, dict) and "text" in part:
                text_parts.append(part["text"])
            elif hasattr(part, "text"):
                text_parts.append(part.text)
            else:
                text_parts.append(str(part))
        content = " ".join(text_parts)
        
    print(f"\n--- ROUTER DECISION ---\n{content}\n----------------------\n")
    
    # We return the response so the conditional edge 'router' function can parse it
    return {"messages": [response]}


def router(state: AgentState) -> Literal["registrar", "strategist", "sourcing", "designer", "engineer", "director", "__end__"]:
    """
    In a full implementation, the Manager would output a structured tool call or 
    keyword to route to the next agent.
    For this scaffold, we will route to END after the Manager speaks, 
    or allow the Manager to be the entry point that delegates (mocked via CLI/API input).
    
    Real implementation: Parse Manager's output to see if it calls 'Transfer to X'.
    """
def router(state: AgentState) -> Literal["registrar", "strategist", "sourcing", "designer", "engineer", "director", "__end__"]:
    """
    Routes to the agent specified in the Manager's 'Decision' field.
    """
    last_message = state['messages'][-1]
    content = last_message.content
    if isinstance(content, list):
        text_parts = []
        for part in content:
            if isinstance(part, dict) and "text" in part:
                text_parts.append(part["text"])
            elif hasattr(part, "text"):
                text_parts.append(part.text)
            else:
                text_parts.append(str(part))
        content = " ".join(text_parts)
    content = content.lower()
    
    # Parse the Decision line
    decision_line = None
    for line in content.split('\n'):
        if line.strip().lower().startswith("decision:"):
            decision_line = line.strip().lower()
            break
            
    print(f"DEBUG: DECISION LINE DETECTED: '{decision_line}'")

    if not decision_line:
        print("DEBUG: NO DECISION LINE. ENDING.")
        return "__end__"
        
    if "registrar" in decision_line:
        return "registrar"
    if "strategist" in decision_line:
        return "strategist"
    if "sourcing" in decision_line:
        return "sourcing"
    if "designer" in decision_line:
        return "designer"
    if "engineer" in decision_line:
        return "engineer"
    if "director" in decision_line:
        return "director"
        
    return "__end__"

# Build Graph
builder = StateGraph(AgentState)

builder.add_node("manager", manager)
builder.add_node("registrar", registrar)
builder.add_node("strategist", strategist)
builder.add_node("sourcing", sourcing)
builder.add_node("designer", designer)
builder.add_node("engineer", engineer)
builder.add_node("director", director)

builder.set_entry_point("manager")

builder.add_conditional_edges(
    "manager",
    router,
    {
        "registrar": "registrar",
        "strategist": "strategist",
        "sourcing": "sourcing",
        "designer": "designer",
        "engineer": "engineer",
        "director": "director",
        "__end__": END
    }
)

# All agents return to manager to report back
# All agents finish after their turn (Direct Expert Response)
builder.add_edge("registrar", END)
builder.add_edge("strategist", END)
builder.add_edge("sourcing", END)
builder.add_edge("designer", END)
builder.add_edge("engineer", END)
builder.add_edge("director", END)

from langgraph.checkpoint.memory import MemorySaver
checkpointer = MemorySaver()

graph = builder.compile(checkpointer=checkpointer)
