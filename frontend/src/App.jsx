import WeekNavigator from "./components/weekNavigator";
import PlannerBoard from "./components/plannerBoard"; 
import { motion, AnimatePresence } from "motion/react";
import { DateProvider } from "./context/DateContext";

function App() {

  return (
    <DateProvider>
      <motion.h1 
        className="text-4xl text-slate-900 font-semibold text-center mb-2"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.5 }}
      >
        Weekly Planner
      </motion.h1>

      <div className="flex justify-center my-5">
        <WeekNavigator/>
      </div>

      <AnimatePresence mode="wait">
        <PlannerBoard/>
      </AnimatePresence>
    </DateProvider>
  );
}

export default App;
