from fastapi import APIRouter, HTTPException
from core.config import User
from core.security import addUser
router = APIRouter()

@router.post("/add-user")
async def addSongs(newUser:User):

    returncode = addUser(newUser.username,newUser.password,newUser.email)

    if returncode == -1:
        raise HTTPException(status_code=500, detail="Cannot write to db")
    elif returncode == 1:
        raise HTTPException(status_code=400, detail="User exits")
    else:
        return "User Created"