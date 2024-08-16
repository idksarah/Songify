from pydantic import BaseModel

class tags(BaseModel):
    tags:list[str]