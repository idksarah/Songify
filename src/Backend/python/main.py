from fastapi import FastAPI
from contextlib import asynccontextmanager
from core.security import currentSession
from api import router as api_endpoints

#NUKE THE THREADS
@asynccontextmanager
async def lifespan(application: FastAPI):
    yield
    currentSession.Kill = True
    currentSession.join()

#start app
app = FastAPI(lifespan=lifespan)

#get all endpoints under /api
app.include_router(api_endpoints, prefix="/api")