from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.task import Task
from schemas.task import TaskCreate, TaskUpdate, WeeklyPlannerResponse, TaskMove
from uuid import UUID
from datetime import date, timedelta

days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

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

@router.patch("/{task_id}")
def update_task(task_id: UUID, task_data: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    update_data = task_data.model_dump(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(task, key, value)
    
    db.commit()
    db.refresh(task)

    return task


@router.get("/week/{monday_date}", response_model=WeeklyPlannerResponse)
def get_week(monday_date: date, db: Session = Depends(get_db)):
    sunday_date = monday_date + timedelta(days=6)
    
    tasks = db.query(Task).filter(
        Task.assigned_date >= monday_date,
        Task.assigned_date <= sunday_date
    ).order_by(
        Task.assigned_date.asc(),
        Task.position.asc()
    ).all()

    response = {day: [] for day in days}

    days_map = {i: name for i, name in enumerate(days)}

    for t in tasks:
        day_name = days_map[t.assigned_date.weekday()]
        response[day_name].append({
            "id": t.id,
            "name": t.name,
            "status": t.status
        })
    
    return response

@router.patch("{task_id}/move")
def move_task(task_id: UUID, move_data: TaskMove, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    old_date = task.assigned_date
    old_pos = task.position
    new_date = move_data.new_assigned_date
    new_pos = move_data.new_position

    if (old_date == new_date and old_pos == new_pos):
        return task
    
    if old_date == new_date:
        if new_pos > old_pos:
            db.query(Task).filter(
                Task.assigned_date == old_date,
                Task.position > old_pos,
                Task.position <= new_pos
            ).update({Task.position: Task.position - 1})
        else:
            db.query(Task).filter(
                Task.assigned_date == old_date,
                Task.position >= new_pos,
                Task.position < old_pos
            ).update({Task.position: Task.position + 1})
    else:
        db.query(Task).filter(
            Task.assigned_date == old_date,
            Task.position > old_pos
        ).update({Task.position: Task.position - 1})

        db.query(Task).filter(
            Task.assigned_date == new_date,
            Task.position > new_pos
        ).update({Task.position: Task.position + 1})
    
    task.assigned_date = new_date
    task.position = new_pos

    db.commit()
    db.refresh(task)
    return task
