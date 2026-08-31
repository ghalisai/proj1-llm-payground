from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

class StateGraph(TypedDict):
    messages :Annotated[list, add_messages]