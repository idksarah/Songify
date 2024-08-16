from fastapi import APIRouter
from .findSongs import router as findSongs_router

router = APIRouter()

router.include_router(findSongs_router)