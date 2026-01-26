import { motion } from "motion/react";
import { Trash2 } from "lucide-react";

export default function TaskItem({ task, day, handleChangeStatus, handleDeleteTask }) {

  const getStatusStyles = () => {
    switch (task.status) {
      case 'completed': return 'bg-emerald-50 border-emerald-200';
      case 'cancelled': return 'bg-rose-50 border-rose-200';
      default: return 'bg-white border-slate-200';
    }
  };

  const getTextStyles = () => {
    switch (task.status) {
      case 'completed': return 'line-through text-emerald-400';
      case 'cancelled': return 'line-through text-rose-400';
      default: return 'text-slate-800';
    }
  };

  const getSelectorTextStyles = () => {
    switch (task.status) {
      case 'completed': return 'text-emerald-400';
      case 'cancelled': return 'text-rose-400';
      default: return 'text-slate-700';
    }
  };

  return (
    <motion.div layout whileTap={{ scale: 0.95 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} layoutId={task.id}>
      <div className={`p-2 rounded-lg border shadow-sm flex gap-2 group transition-all hover:shadow-lg ${getStatusStyles()}`}>

        <span className={`font-medium text-md wrap-break-word flex-1 mx-4 my-3 ${getTextStyles()}`}>
          {task.name}
        </span>

        <div className="flex flex-col justify-between items-end">
          <button
            className="text-red-600 transition-all cursor-pointer lg:opacity-0 group-hover:opacity-100 hover:scale-125"
            onClick={() => handleDeleteTask(day, task.id)}
          >
            <Trash2 size={18} />
          </button>
          <select
            defaultValue={task.status}
            className={`text-xs bg-white border border-slate-300 rounded px-2 py-1 ${getSelectorTextStyles()} cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-400 w-fit mt-1`}
            onChange={e => handleChangeStatus(day, e.target.value, task.id)}
          >
            <option className="text-slate-700" value="pending">Pending</option>
            <option className="text-slate-700" value="completed">Done</option>
            <option className="text-slate-700" value="cancelled">Not Done</option>
          </select>
        </div>

      </div>
    </motion.div>
  );
}