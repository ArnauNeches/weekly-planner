import DayColumn from "./dayColumn";
import { DAYS } from "../data/initialData";
import useWeeklyPlanner from "../hooks/useWeeklyPlanner";
import { motion } from "motion/react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import TaskItem from "./taskItem";

export default function PlannerBoard({ currentWeek }) {
  const { weekData, activeId, addTask, deleteTask, editTask, changeStatus, handleDragOver, handleDragStart, handleDragEnd, findActiveTask } = useWeeklyPlanner(currentWeek);

  return (
    <DndContext 
      onDragStart={handleDragStart} 
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >

      <motion.div initial= {{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} exit={{opacity:0, y: -20}}>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {DAYS.map(day => (
            <DayColumn
              key={day} 
              tasks={weekData[day] || []} 
              onNewTask={addTask} 
              onChangeStatus={changeStatus} 
              onDeleteTask={deleteTask}
              onEditTask={editTask}
              activeId={activeId}
            >
              {day.toUpperCase()}
            </DayColumn>
          ))}
        </div>
      </motion.div>

      <DragOverlay>
          {activeId? (
            <TaskItem task={findActiveTask(activeId)} day="Moving" handleChangeStatus={()=>{}} handleDeleteTask={()=>{}}/>
          ): null}
      </DragOverlay>

    </DndContext>
  );
}