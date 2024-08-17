import json
from fastapi import APIRouter
from core.config import tags
from db import readbd
from typing import List
from pydantic import BaseModel

router = APIRouter()

class songResponse(BaseModel):
    title: List[str]

#finding all songs matching tags
#Todo: Does this shit work? Note, It dosn't.
@router.get("/find-songs", response_model=songResponse)
async def findSongs(tag:str):

    #get song list
    songs = readbd.getSongs()

    matchingSongsTitles = []
    for song in songs:
        if song["title"] in tag.tags:
            matchingSongsTitles.append(song["title"])
            
        elif song["artist"] in tag.tags:
            matchingSongsTitles.append(song["title"])

    matchingSongs = {"title": matchingSongsTitles}
    
     return {"title": matchingSongsTitles}
