from fastapi import FastAPI
from api import router as api_endpoints

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5500",
    "https://idksarah.github.io/nanocats-peddie/",
    
]
app.include_router(api_endpoints, prefix="/api")