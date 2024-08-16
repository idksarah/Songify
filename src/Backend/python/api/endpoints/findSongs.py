import json
from fastapi import APIRouter
from core.config import tags
from db import readbd

router = APIRouter()


#finding all songs matching tags
#Todo: Does this shit work? Note, It dosn't.
@router.get("/find-songs")
async def findSongs(tag:tags):

    #get song list
    songs = readbd.getSongs()

    #convert all the JSON to python Dictionary
    songs = json.loads(song)

    matchingSongsTitles = []
    for song in songs:
        if song["title"] in tag.tags:
            matchingSongsTitles.append(song["title"])
            print("a")
        elif song["artist"] in tag.tags:
            matchingSongsTitles.append(song["title"])

    matchingSongs = {"title": matchingSongsTitles}
    
    return json.dumps( matchingSongs, indent=4)
