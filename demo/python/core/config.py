from pydantic import BaseModel

class tags(BaseModel):
    sessionID:str | None = None
    tags:list[str]

class addSong(BaseModel):
    sessionID:str | None = None
    title:str
    artist:str
    lyrics:str

class User(BaseModel):
    username:str
    password:str
    email:str