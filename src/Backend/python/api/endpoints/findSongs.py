import json
from fastapi import APIRouter, HTTPException
from core.config import tags
from db import readbd

router = APIRouter()

#finding all songs matching tags
#Todo: Does this shit work? Note, It dosn't.
@router.get("/find-songs")
async def findSongs(tag:tags):

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
    
     return json.dumps(matchingSongs, indent=4)