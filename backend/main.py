from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from database import engine, Base
from routers import tasks

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(tasks.router)

# Serve frontend

frontend_dist_path = Path("../frontend/dist")
app.mount("/assets", StaticFiles(directory=frontend_dist_path / "assets"), name="static")

@app.get("/")
async def serve_frontend():
    return FileResponse(frontend_dist_path / "index.html")