from fastapi import FastAPI
from database import engine, Base
from models import task

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
async def root():
    return {"Hello": "World"}