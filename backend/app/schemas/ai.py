from pydantic import BaseModel


class AIQuery(BaseModel):
    query: str


class AIResponse(BaseModel):
    response: str
    query: str