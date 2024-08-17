from fastapi import APIRouter
from .findSongs import router as findSongs_router
from .addsong import router as addSongs_router
from .affirmUser import router as affirmUser_router
from .addUser import router as addUser_router

router = APIRouter()

router.include_router(findSongs_router)
router.include_router(addSongs_router)
router.include_router(affirmUser_router)
router.include_router(addUser_router)