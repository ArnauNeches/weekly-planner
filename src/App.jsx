import DayColumn from "./components/dayColumn"
import {initialData, DAYS} from "./data/initialData"

function App() {
  const weekData = initialData;

  return (
    <>
      <h1 className="text-4xl text-white font-bold text-center mb-8">Weekly Planner</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {DAYS.map(day => <DayColumn key={day} tasks={weekData[day]}>{day.toUpperCase()}</DayColumn>)}
      </div>
    </>
  );
}

export default App;
