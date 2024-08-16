from fastapi import FastAPI
from api import router as api_endpoints

app = FastAPI()

app.include_router(api_endpoints, prefix="/api")