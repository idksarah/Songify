from fastapi import APIRouter, HTTPException
from core.config import User
from core.security import affirmUser

router = APIRouter()

@router.post("/get-uuid")
async def addSongs(User:User):

    returncode = affirmUser(User.username,User.password)

    if returncode == -1:
        raise HTTPException(status_code=500, detail="Cannot write to db")
    elif returncode == 1:
        return "Invalid account details"
    else:
        #this is the uuid not a error code like the others
        return returncode