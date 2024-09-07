from fastapi import FastAPI
from api import router as api_endpoints
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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