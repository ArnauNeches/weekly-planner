import uuid
from enum import Enum
from sqlalchemy import Column, String, Date, Integer, Enum as SqlEnum
from sqlalchemy.dialects.postgresql import UUID
from database import Base

class TaskStatus(str, Enum):
    cancelled = "cancelled"
    completed = "completed"
    pending = "pending"

class Task(Base):
    __tablename__ = "tasks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, nullable=False)
    status = Column(SqlEnum(TaskStatus), default=TaskStatus.pending, nullable=False)
    assigned_date = Column(Date, nullable=False, index=True)
    position = Column(Integer, nullable=False, default=0)