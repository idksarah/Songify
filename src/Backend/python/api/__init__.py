from fastapi import APIRouter
from api.endpoints import erouter as endpoints_router

router = APIRouter()

router.include_router(endpoints_router)