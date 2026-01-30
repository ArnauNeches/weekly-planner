import { useState } from "react";
import TaskItem from "./taskItem";
import { ListPlus } from "lucide-react";
import { AnimatePresence } from "motion/react";

export default function DayColumn({ children, tasks, onNewTask, onChangeStatus, onDeleteTask }) {
  const [newTask, setNewTask] = useState("");

  const title = children.charAt(0).toUpperCase() + children.slice(1);

  return (
    <section className="w-full max-w-sm flex flex-col gap-4">
      <div className="bg-slate-100/60 border border-slate-200 hover:bg-slate-100 p-4 rounded-xl shadow-md flex justify-between items-center">
        <h3 className="font-bold text-xl text-slate-900">{title}</h3>
        <span className="text-sm text-slate-500 font-mono">{tasks.length}</span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newTask.trim()) return;
          onNewTask(children, newTask);
          setNewTask("");
        }}
        className="bg-slate-100/60 border border-slate-200 hover:bg-slate-100 p-2 rounded-xl transition hover:shadow-md flex justify-between items-start"
      >
        <input value={newTask} className="bg-white border border-black rounded-xl p-1" type="text" onChange={e => setNewTask(e.target.value)} />
        <button className="text-black transition-all cursor-pointer hover:scale-125 pt-1" type="submit">
          <ListPlus size={22} />
        </button>
      </form>

      <div className="flex flex-col gap-2 min-h-20 lg:min-h-50 lg:h-60 lg:overflow-y-auto">
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              day={children}
              handleChangeStatus={onChangeStatus}
              handleDeleteTask={onDeleteTask}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}