from fastapi import APIRouter, HTTPException
from core.config import addSong
from db.writedb import writeSong
from core.security import cheakSessionID

router = APIRouter()

@router.post("/new-song")
async def addSongs(song:addSong):

    if not cheakSessionID(song.SessionID):
        raise HTTPException(status_code=500, detail="Invalid Session")

    returncode = writeSong(song)

    if returncode == -1:
        raise HTTPException(status_code=500, detail="Cannot write to db")
