import { useState } from "react";
import DayColumn from "./dayColumn";
import { DAYS } from "../data/initialData";
import useWeeklyPlanner from "../hooks/useWeeklyPlanner";
import { motion, AnimatePresence } from "motion/react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import TaskItem from "./taskItem";
import { useDate } from "../context/DateContext";
import { BarChart3, CalendarSync } from "lucide-react";
import StatisticsModal from "./statisticsModal";

export default function PlannerBoard() {
  const { currentWeek, backCurrentWeek, isCurrentWeek } = useDate();
  const { weekData, activeId, addTask, deleteTask, editTask, changeStatus, handleDragOver, handleDragStart, handleDragEnd, findActiveTask } = useWeeklyPlanner(currentWeek);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between max-w-7xl mx-auto px-4 mb-2">
        <button 
            onClick={backCurrentWeek}
            disabled={isCurrentWeek()}
            className={isCurrentWeek() ? 
              "flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-300 px-4 py-2 rounded-lg shadow-sm font-medium" :
              "flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:bg-slate-50 transition-all font-medium cursor-pointer"
            }
        >
          <CalendarSync size={18}/>
          Current week
        </button>
        <button 
            onClick={() => setIsStatsOpen(true)}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:bg-slate-50 transition-all font-medium cursor-pointer"
        >
            <BarChart3 size={18} />
            View Stats
        </button>
      </div>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} exit={{ opacity: 0, y: -20 }}>
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
                {day}
              </DayColumn>
            ))}
          </div>
        </motion.div>

        <DragOverlay>
          {activeId ? (
            <TaskItem task={findActiveTask(activeId)} day="Moving" handleChangeStatus={() => { }} handleDeleteTask={() => { }} />
          ) : null}
        </DragOverlay>
      </DndContext>
      <AnimatePresence>
        {isStatsOpen && (
            <StatisticsModal 
                isOpen={isStatsOpen} 
                onClose={() => setIsStatsOpen(false)} 
                weekData={weekData} 
            />
        )}
      </AnimatePresence>
    </>

  );
}