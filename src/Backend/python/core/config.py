from pydantic import BaseModel

class tags(BaseModel):
    sessionID:str
    tags:list[str]

class addSong(BaseModel):
    sessionID:str
    title:str
    artist:str
    lyrics:str

class User(BaseModel):
    username:str
    password:str
    email:str