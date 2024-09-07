from fastapi import APIRouter, HTTPException
from core.config import addSong
from core.security import cheakSessionID
from db.writedb import writeSong

router = APIRouter()

@router.post("/new-song")
async def addSongs(song:addSong):

    if not cheakSessionID(song.sessionID):
        raise HTTPException(status_code=500, detail="Invalid Session")

    returncode = writeSong(song)

    if returncode == 1:
        return "Song already exists"

    if returncode == -1:
        raise HTTPException(status_code=500, detail="Cannot write to db")
    
    else:
        return "Succsesfuly wrote"