import { useSortable } from "@dnd-kit/sortable";
import TaskItem from "./taskItem";
import { CSS } from "@dnd-kit/utilities";


export default function SortableTask({ task, day, handleChangeStatus, handleDeleteTask }){
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: task.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TaskItem 
                key={task.id}
                task={task}
                day={day}
                handleChangeStatus={handleChangeStatus}
                handleDeleteTask={handleDeleteTask}
            />
        </div>
    )
}