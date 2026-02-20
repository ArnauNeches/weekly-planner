from pydantic import BaseModel
from datetime import date
from uuid import UUID
from models.task import TaskStatus
from typing import Optional, List

class TaskCreate(BaseModel):
    id: UUID
    name: str
    assigned_date: date

class TaskFrontend(BaseModel):
    id: UUID
    name: str
    status: TaskStatus

    class Config:
        from_attributes = True

class TaskUpdate(BaseModel):
    name: Optional[str] = None
    status: Optional[TaskStatus] = None

class TaskMove(BaseModel):
    new_assigned_date: date
    new_position: int

class WeeklyPlannerResponse(BaseModel):

    monday: List[TaskFrontend]
    tuesday: List[TaskFrontend]
    wednesday: List[TaskFrontend]
    thursday: List[TaskFrontend]
    friday: List[TaskFrontend]
    saturday: List[TaskFrontend]
    sunday: List[TaskFrontend]
