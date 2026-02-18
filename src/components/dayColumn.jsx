import TaskItem from "./taskItem";
import { ListPlus } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import useInputTask from "../hooks/useInputTask";

export default function DayColumn({ children, tasks, onNewTask, onChangeStatus, onDeleteTask, onEditTask }) {
  const {newTask, errorMessage, handleNewInputTask, resetInputTask, resetErrorMessage, setInvalidErrorMessage} = useInputTask();
  const title = children.charAt(0).toUpperCase() + children.slice(1);

  const { setNodeRef } = useDroppable({ id: children, });

  return (
    <section ref={setNodeRef} className="w-full max-w-sm flex flex-col gap-4">
      <div className="bg-slate-100/60 border border-slate-200 hover:bg-slate-100 p-4 rounded-xl shadow-md flex justify-between items-center">
        <h3 className="font-bold text-xl text-slate-900">{title}</h3>
        <span className="text-sm text-slate-500 font-mono">{tasks.length}</span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newTask.trim()) {
            setInvalidErrorMessage();
            return;
          }
          resetErrorMessage();
          onNewTask(children, newTask);
          resetInputTask();
        }}
        className="bg-slate-100/60 border border-slate-200 hover:bg-slate-100 p-2 rounded-xl transition hover:shadow-md flex justify-between items-center"
      >
        <input value={newTask} className="bg-white border border-black rounded-xl p-1" type="text" onChange={handleNewInputTask} onBlur={resetErrorMessage}/>
        {errorMessage && <span className="text-rose-500">{errorMessage}</span>}
        <button className="text-black transition-all cursor-pointer hover:scale-125 pt-1" type="submit">
          <ListPlus size={22} />
        </button>
      </form>
      <SortableContext items={tasks.map(task=>task.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2 min-h-20 lg:min-h-50 lg:h-60 lg:overflow-y-auto">
          <AnimatePresence>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                day={children}
                handleChangeStatus={onChangeStatus}
                handleDeleteTask={onDeleteTask}
                handleEditTask={onEditTask}
              />
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
    </section>
  );
}