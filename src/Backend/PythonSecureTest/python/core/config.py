from pydantic import BaseModel

class tags(BaseModel):
    SessionID:int
    tags:list[str]

class addSong(BaseModel):
    SessionID:int
    title:str
    artist:str
    lyrics:str

class User(BaseModel):
    username:str
    password:str