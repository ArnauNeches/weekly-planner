import { motion } from "motion/react";
import { Trash2, SquarePen } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useEditLogic from "../hooks/useEditLogic";

const getStatusStyles = (stat) => {
  switch (stat) {
    case 'completed': return 'bg-emerald-50 border-emerald-200';
    case 'cancelled': return 'bg-rose-50 border-rose-200';
    default: return 'bg-white border-slate-200';
  }
};

const getTextStyles = (stat) => {
  switch (stat) {
    case 'completed': return 'line-through text-emerald-400';
    case 'cancelled': return 'line-through text-rose-400';
    default: return 'text-slate-800';
  }
};

const getSelectorTextStyles = (stat) => {
  switch (stat) {
    case 'completed': return 'text-emerald-400';
    case 'cancelled': return 'text-rose-400';
    default: return 'text-slate-700';
  }
};

export default function TaskItem({ task, day, handleChangeStatus, handleDeleteTask, handleEditTask }) { 
  const {isEditing, editValue, inputRef, onSave, handleKeyDown, handleInputChange, handleClickEdit} = useEditLogic(handleEditTask, task, day);
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: task.id});
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <motion.div ref={setNodeRef} style={style} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className={`p-2 rounded-lg border shadow-sm flex gap-2 group transition-all hover:shadow-lg ${getStatusStyles(task.status)}`}>

        {isEditing ? (
            <input 
                ref={inputRef}
                value={editValue}
                onChange={handleInputChange}
                onBlur={onSave}
                onKeyDown={handleKeyDown}
                className="flex-1 mx-4 my-3 bg-white border border-blue-400 rounded outline-none text-slate-800"
            />
          ) : (
            <span 
                {...listeners} 
                {...attributes} 
                className={`font-medium text-md wrap-break-word flex-1 mx-4 my-3 ${getTextStyles(task.status)}`}
            >
                {task.name}
            </span>
          )}

        <div className="flex flex-col justify-between items-end">
          <div className="flex gap-2">
            <button
              className="text-black transition-all cursor-pointer lg:opacity-0 group-hover:opacity-100 hover:scale-125"
              onClick={handleClickEdit}
            >
              <SquarePen size={18}/>
            </button>
            <button
              className="text-red-600 transition-all cursor-pointer lg:opacity-0 group-hover:opacity-100 hover:scale-125"
              onClick={() => handleDeleteTask(day, task.id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
          <select
            defaultValue={task.status}
            className={`text-xs bg-white border border-slate-300 rounded px-2 py-1 ${getSelectorTextStyles(task.status)} cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-400 w-fit mt-1`}
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