import DayColumn from "./components/dayColumn"
import {initialData, DAYS} from "./data/initialData"

function App() {
  // We just read it for now, next exercise we make this stateful
  const weekData = initialData;

  return (
    <div className="bg-slate-900 min-h-screen p-8">
      <h1 className="text-4xl text-white font-bold text-center mb-8">Weekly Planner</h1>
      <div className="grid grid-cols-4 gap-6 justify-items-center">
        {DAYS.map(day => <DayColumn key={day} tasks={weekData[day]}>{day.toUpperCase()}</DayColumn>)}
      </div>
    </div>
  );
}

export default App
