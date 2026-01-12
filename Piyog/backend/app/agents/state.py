import operator
from typing import Annotated, Sequence, TypedDict, Union, List

from langchain_core.messages import BaseMessage

class AgentState(TypedDict):
    # The list of messages in the conversation
    messages: Annotated[Sequence[BaseMessage], operator.add]
    # The next agent to act
    next: str
    # Global report/summary maintained by the Manager
    report: str
    # Task status tracking
    task_status: dict
