from pydantic import BaseModel
from datetime import date
from uuid import UUID
from models.task import TaskStatus

class TaskCreate(BaseModel):
    id: UUID
    name: str
    assigned_date: date

class TaskFrontend(BaseModel):
    id: UUID
    name: str
    status: TaskStatus
