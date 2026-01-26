import DayColumn from "./dayColumn";
import { DAYS } from "../data/initialData";
import useWeeklyPlanner from "../hooks/useWeeklyPlanner";

export default function PlannerBoard({ currentWeek }) {
  const { weekData, addTask, deleteTask, changeStatus } = useWeeklyPlanner(currentWeek);

  return (
    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {DAYS.map(day => (
          <DayColumn
            key={day} 
            tasks={weekData[day] || []} 
            onNewTask={addTask} 
            onChangeStatus={changeStatus} 
            onDeleteTask={deleteTask}
          >
            {day.toUpperCase()}
          </DayColumn>
        ))}
    </div>
  );
}