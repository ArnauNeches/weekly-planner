from pydantic import BaseModel
from datetime import date
from uuid import UUID

class TaskCreate(BaseModel):
    id: UUID
    name: str
    assigned_date: date