import { useEffect, useState } from "react";
import DayColumn from "./components/dayColumn"
import {initialData, DAYS} from "./data/initialData"
import {v4 as uuidv4} from 'uuid';

function App() {
  const [weekData, setWeekData] = useState( () => {
    const storage = localStorage.getItem("weekly-planner-data");
    if (storage) return JSON.parse(storage);
    return initialData;
  }
);
  
  useEffect(() => {
    const newData = JSON.stringify(weekData);
    localStorage.setItem("weekly-planner-data", newData);
  }, [weekData]);

  function handleDeleteTask(day, id){
    const dayKey = day.toLowerCase();

    setWeekData(prevWeekData => {
      return ({
        ...prevWeekData,
        [dayKey]: [
          ...prevWeekData[dayKey].filter(task => task.id !== id)
        ]
      })
    });
  }

  function handleChangeStatus(day, newStatus, id){
    const dayKey = day.toLowerCase();

    setWeekData(prev => {
      const dayTasks = prev[dayKey];
      const updatedTasks = dayTasks.map(task => {
        if (task.id == id) return {...task, status: newStatus};
        return task;
      });

      return {
        ...prev,
        [dayKey]: updatedTasks
      };
  });
}

  function handleAddTask(day, text){

    setWeekData(prevWeekData => {
      const newEntry = {
        id: uuidv4(),
        name: text,
        status: 'pending',
        createdAt: new Date().toLocaleDateString()
      }

      return ({
          ...prevWeekData,
          [day.toLowerCase()]: [
            ...prevWeekData[day.toLowerCase()],
            newEntry
          ]
        })
      });
  }

  return (
    <>
      <h1 className="text-4xl text-white font-bold text-center mb-8">Weekly Planner</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {DAYS.map(day => <DayColumn key={day} tasks={weekData[day]} onNewTask={handleAddTask} onChangeStatus={handleChangeStatus} onDeleteTask={handleDeleteTask}>{day.toUpperCase()}</DayColumn>)}
      </div>
    </>
  );
}

export default App;
