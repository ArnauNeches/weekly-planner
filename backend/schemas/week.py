from pydantic import BaseModel
from typing import List
from task import TaskFrontend

class WeeklyPlannerResponse(BaseModel):

    monday: List[TaskFrontend]
    tuesday: List[TaskFrontend]
    wednesday: List[TaskFrontend]
    thursday: List[TaskFrontend]
    friday: List[TaskFrontend]
    saturday: List[TaskFrontend]
    sunday: List[TaskFrontend]