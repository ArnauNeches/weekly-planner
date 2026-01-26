import DayColumn from "./components/dayColumn"
import WeekNavigator from "./components/weekNavigator";

import { DAYS } from "./data/initialData"

import useDateLogic from "./hooks/useDateLogic";
import useWeeklyPlanner from "./hooks/useWeeklyPlanner";



function App() {
  const {currentWeek, prevWeek, nextWeek, getNextSunday} = useDateLogic();
  const { weekData, addTask, deleteTask, changeStatus } = useWeeklyPlanner(currentWeek);


  return (
    <>
      <h1 className="text-4xl text-white font-bold text-center mb-8">Weekly Planner</h1>

      <div className="flex justify-center">
        <WeekNavigator prevWeek={prevWeek} nextWeek={nextWeek}>
          {`${currentWeek.toLocaleDateString()} – ${getNextSunday(currentWeek).toLocaleDateString()}`}
        </WeekNavigator>
      </div>


      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {DAYS.map(day => <DayColumn
          key={day} 
          tasks={weekData[day]} 
          onNewTask={addTask} 
          onChangeStatus={changeStatus} 
          onDeleteTask={deleteTask}
          >
            {day.toUpperCase()}
          </DayColumn>)}
      </div>
    </>
  );
}

export default App;
