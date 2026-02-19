from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors  import CORSMiddleware
from database import engine, Base
from routers import tasks

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(tasks.router, prefix="/api")

frontend_dist_path = Path("../frontend/dist")
app.mount("/assets", StaticFiles(directory=frontend_dist_path / "assets"), name="static")

@app.get("/")
async def serve_frontend():
    return FileResponse(frontend_dist_path / "index.html")