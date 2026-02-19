from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.task import Task
from schemas.task import TaskCreate
from uuid import UUID

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

@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: UUID, db: Session = Depends(get_db)):
    task_to_delete = db.query(Task).filter(Task.id == task_id).first()

    if not task_to_delete:
        raise HTTPException(status_code=404, detail="Task not found")
    
    deleted_pos = task_to_delete.position
    target_date = task_to_delete.assigned_date

    db.delete(task_to_delete)

    db.query(Task).filter(
        Task.assigned_date == target_date,
        Task.position > deleted_pos
    ).update({Task.position: Task.position - 1})

    db.commit()
    return None