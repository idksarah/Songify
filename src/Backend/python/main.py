from fastapi import FastAPI
from contextlib import asynccontextmanager
from core.security import currentSession
from api import router as api_endpoints
from fastapi.middleware.cors import CORSMiddleware

#NUKE THE THREADS
@asynccontextmanager
async def lifespan(application: FastAPI):
    yield
    currentSession.Kill = True
    currentSession.join()

#start app
app = FastAPI(lifespan=lifespan)

#get all endpoints under /api
#what is this????
origins = [
    "http://localhost",
    "http://localhost:5500",
    "https://idksarah.github.io/nanocats-peddie/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_endpoints, prefix="/api")