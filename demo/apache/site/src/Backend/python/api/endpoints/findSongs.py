import json
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from core.security import cheakSessionID
from db import readbd

router = APIRouter()

class TagRequest(BaseModel):
    sessionID: str
    tags: List[str]


#finding all songs matching tags
#Todo: Does this shit work? Note, It dosn't.
@router.post("/find-songs")
async def findSongs(tag: TagRequest):
    if not cheakSessionID(tag.sessionID):
        raise HTTPException(status_code=500, detail="Invalid Session")
    
    #get song list
    songs = readbd.getSongs()

    if songs == -1:
        raise HTTPException(status_code=500, detail="Database is down")
    
    matchingSongsTitles = []
    for song in songs:
        if song["title"] in tag.tags:
            matchingSongsTitles.append(song["title"])
            
        elif song["artist"] in tag.tags:
            matchingSongsTitles.append(song["title"])

    matchingSongs = {"title": matchingSongsTitles}
    
    return matchingSongs