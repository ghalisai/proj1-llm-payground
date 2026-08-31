from pydantic import BaseModel, Field
from typing import Annotated

class ChatResponse(BaseModel):
    answer: Annotated[str, Field(description="2-3 sentence overview, no markdown")] = None