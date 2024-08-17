from fastapi import APIRouter, HTTPException
from core.config import addSong
from db.writedb import writeSong

router = APIRouter()

@router.post("/new-song")
async def addSongs(song:addSong):


    returncode = writeSong(song)

    if returncode == -1:
        raise HTTPException(status_code=500, detail="Cannot write to db")
