from fastapi import APIRouter, HTTPException
from core.config import User
from core.security import affirmUser

router = APIRouter()

@router.post("/new-song")
async def addSongs(User:User):

    returncode = affirmUser(User.username,User.password)

    if returncode == -1:
        raise HTTPException(status_code=500, detail="Cannot write to db")