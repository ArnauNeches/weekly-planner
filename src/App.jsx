import WeekNavigator from "./components/weekNavigator";
import useDateLogic from "./hooks/useDateLogic";
import PlannerBoard from "./components/plannerBoard"; 

function App() {
  const { currentWeek, prevWeek, nextWeek, getNextSunday } = useDateLogic();

  return (
    <>
      <h1 className="text-4xl text-slate-900 font-semibold text-center">Weekly Planner</h1>

      <div className="flex justify-center my-5">
        <WeekNavigator prevWeek={prevWeek} nextWeek={nextWeek}>
          {`${currentWeek.toLocaleDateString()} – ${getNextSunday(currentWeek).toLocaleDateString()}`}
        </WeekNavigator>
      </div>

      <PlannerBoard 
        key={currentWeek.toLocaleDateString()} 
        currentWeek={currentWeek} 
      />
    </>
  );
}

export default App;
