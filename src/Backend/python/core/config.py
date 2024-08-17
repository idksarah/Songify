from pydantic import BaseModel

class tags(BaseModel):
    tags:list[str]

class addSong(BaseModel):
    SessionID:int | None = None
    title:str
    artist:str
    lyrics:str

class User(BaseModel):
    username:str
    password:str