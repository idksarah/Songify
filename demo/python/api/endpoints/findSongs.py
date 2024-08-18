import json
from fastapi import APIRouter, HTTPException
from core.config import tags
from core.security import cheakSessionID
from db import readbd

router = APIRouter()


#finding all songs matching tags
#Todo: Does this shit work? Note, It dosn't.
@router.post("/find-songs")
async def findSongs(tag:tags):

    if not cheakSessionID(tag.sessionID):
        raise HTTPException(status_code=500, detail="Invalid Session")
    
    #get song list
    songs = readbd.getSongs()

    if songs == -1:
        raise HTTPException(status_code=500, detail="Database is down")
    
    matchingSongs = []
    for song in songs:
        if song["title"] in tag.tags:
            matchingSongs.append(song)
            
        elif song["artist"] in tag.tags:
            matchingSongs.append(song)
    
    return json.dumps(matchingSongs, indent=4)