import { Trash2 } from "lucide-react";

export default function TaskItem({ task, day, handleChangeStatus }) {
  
  const getStatusStyles = () => {
    switch (task.status) {
      case 'completed': return 'bg-green-100 border-green-300 opacity-75';
      case 'cancelled': return 'bg-red-300 border-red-500 opacity-80';
      default: return 'bg-white border-slate-300'; 
    }
  };

  const getTextStyles = () => {
    switch (task.status) {
      case 'completed': return 'line-through text-green-700';
      case 'cancelled': return 'line-through text-red-500';
      default: return 'text-slate-700';
    }
  };

  return (
    <div className={`p-2 rounded-lg border-2 shadow-sm flex gap-2 group transition-all hover:shadow-lg ${getStatusStyles()}`}>

      <span className={`font-medium text-md wrap-break-word flex-1 mx-4 my-3 ${getTextStyles()}`}>
        {task.name}
      </span>

      <div className="flex flex-col justify-between items-end">        
        <button className="text-red-600 transition-all cursor-pointer opacity-0 group-hover:opacity-100 hover:scale-125">
          <Trash2 size={18} />
        </button>
        <select 
            defaultValue={task.status} 
            className="text-xs bg-transparent border border-slate-300 rounded px-2 py-1 text-slate-500 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-400 w-fit mt-1">
            <option value="pending">Pending</option>
            <option value="completed">Done</option>
            <option value="cancelled">Not Done</option>
        </select>
      </div>

    </div>
  );
}