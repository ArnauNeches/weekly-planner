import TaskItem from "./taskItem"

export default function DayColumn({ children, tasks }) {
  // Capitalize first letter
  const title = children.charAt(0).toUpperCase() + children.slice(1);

  return (
    <section className="w-full max-w-sm flex flex-col gap-4">
      <div className="bg-slate-100 p-4 rounded-xl shadow-md flex justify-between items-center">
        <h3 className="font-bold text-xl text-slate-800">{title}</h3>
        <span className="text-sm text-slate-500 font-mono">{tasks.length}</span>
      </div>
      
      <div className="flex flex-col gap-2 min-h-[200px] lg:h-[200px] lg:overflow-y-auto">
        {tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
          />
        ))}
      </div>
    </section>
  );
}