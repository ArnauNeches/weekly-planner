from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.task import Task
from schemas.task import TaskCreate

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.post("/")
def create_task(task_data: TaskCreate, db: Session = Depends(get_db)):
    current_count = db.query(Task).filter(Task.assigned_date == task_data.assigned_date).count()

    new_task = Task(
        id=task_data.id,
        name=task_data.name,
        assigned_date=task_data.assigned_date,
        position=current_count,
        status="pending"
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    
    return new_task