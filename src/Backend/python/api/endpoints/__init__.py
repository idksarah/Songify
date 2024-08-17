from fastapi import APIRouter
from .findSongs import router as findSongs_router
from .addsong import router as addSongs_router

erouter = APIRouter()

erouter.include_router(findSongs_router)
erouter.include_router(addSongs_router)