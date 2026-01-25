import { useState } from "react";
import DayColumn from "./components/dayColumn"
import {initialData, DAYS} from "./data/initialData"
import {v4 as uuidv4} from 'uuid';

function App() {
  const [weekData, setWeekData] = useState(initialData);
  
  function handleDeleteTask(day, id){
    setWeekData(prevWeekData => {
      return ({
        ...prevWeekData,
        [day.toLowerCase()]: [
          ...prevWeekData[day.toLowerCase()].filter(task => task.id !== id)
        ]
      })
    });
  }

  function handleChangeStatus(day, newStatus, id){

    setWeekData(prevWeekData => {
      let editedEntry = prevWeekData[day.toLowerCase()].filter(task => task.id === id)[0];
      editedEntry.status = newStatus;
      return ({
          ...prevWeekData,
          [day.toLowerCase()]: [
            ...prevWeekData[day.toLowerCase()].filter(task => task.id !== id),
            editedEntry
          ]
        })
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
