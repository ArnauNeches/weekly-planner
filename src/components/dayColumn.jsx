import TaskItem from "./taskItem"

export default function DayColumn({children, tasks}){
    return (
        <section className="basis-xl grid gap-2 auto-rows-min">
            <h3 className="bg-white w-sm min-h-12 flex items-center justify-center font-bold text-2xl rounded-xl tracking-wider">{children}</h3>
            {tasks.map(task => {
                return <TaskItem name={task.name} status={task.status} createdAt={task.createdAt} key={task.id}/>
            })}
        </section>
    )
}