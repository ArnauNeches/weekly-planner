import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { DAYS, initialData } from "../data/initialData";
import { arrayMove } from "@dnd-kit/sortable";
import { saveWeek, getWeekAPI, deleteTaskAPI, addTaskAPI } from "../services/api";

export default function useWeeklyPlanner(currentWeek) {

    const daysMap = Object.fromEntries(
        DAYS.map((name, index) => [name, index])
    );

    function findActiveTask(id) {
        for (const day of DAYS){
            const task = weekData[day]?.find(t => t.id === id);
            if (task) return task;
        }
        return null;
    }

    const [activeId, setActiveId] = useState(null);
    const [weekData, setWeekData] = useState(initialData);

    useEffect(() => {
        const dateKey = currentWeek.toLocaleDateString('fr-CA');
        
        async function loadWeek() {
            try {
                const data = await getWeekAPI(dateKey);
                setWeekData(data);
            } catch (error) {
                console.error("Error loading week: ", error);
            }
        }

        loadWeek();
    }, [currentWeek]);

    async function deleteTask(day, id) {
        const dayKey = day;

        try {
            await deleteTaskAPI(id);

            setWeekData(prevWeekData => {
                return ({
                    ...prevWeekData,
                    [dayKey]: [
                        ...prevWeekData[dayKey].filter(task => task.id !== id)
                    ]
                })
            });

        } catch (error) {
            console.error("Failed to delete task", error);
        }
    }

    function editTask(day, id, newName) {
        const dayKey = day.toLowerCase();
        setWeekData(prev => ({
            ...prev, 
            [dayKey]: prev[dayKey].map(task =>
                task.id === id ? {...task, name: newName} : task
            )
        }));
    }

    function changeStatus(day, newStatus, id) {
        const dayKey = day.toLowerCase();

        setWeekData(prev => {
            const dayTasks = prev[dayKey];
            const updatedTasks = dayTasks.map(task => {
                if (task.id == id) return { ...task, status: newStatus };
                return task;
            });

            return {
                ...prev,
                [dayKey]: updatedTasks
            };
        });
    }

    async function addTask(week, day, text) {
        
        const newDate = new Date(week);
        newDate.setDate(newDate.getDate() + daysMap[day]);

        const newEntry = {
            id: uuidv4(),
            name: text,
            assigned_date: newDate.toLocaleDateString('fr-CA')
        }

        try {
            await addTaskAPI(newEntry);

            setWeekData(prevWeekData => {
                return ({
                    ...prevWeekData,
                    [day.toLowerCase()]: [
                        ...prevWeekData[day.toLowerCase()],
                        newEntry
                    ]
                })
            });

        } catch (error) {
            console.error("Failed to create new task: ", error);
        }
    }

    function findContainer(id) {
        if (id in weekData) return id;
        return Object.keys(weekData).find((key) =>
            weekData[key].find((t) => t.id === id)
        );
    }

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    function handleDragOver(event) {
        const { active, over } = event;
        const overId = over.id;

        if (!overId || active.id === overId) return;

        const activeContainer = findContainer(active.id);
        const overContainer = DAYS.includes(overId.toLowerCase()) ? overId.toLowerCase() : findContainer(overId);

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return;
        }

        setWeekData((prev) => {
            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];
            const activeIndex = activeItems.findIndex((t) => t.id === active.id);
            const overIndex = overItems.findIndex((t) => t.id === overId);

            let newIndex;
            if (overId in prev) {
                newIndex = overItems.length + 1;
            } else {
                const isBelowOverItem =
                    over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top > over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0;
                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return {
                ...prev,
                [activeContainer]: [
                    ...prev[activeContainer].filter((item) => item.id !== active.id),
                ],
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    activeItems[activeIndex],
                    ...prev[overContainer].slice(newIndex, prev[overContainer].length),
                ],
            };
        });
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over?.id);

        if ( activeContainer && overContainer && activeContainer === overContainer) {
            const activeIndex = weekData[activeContainer].findIndex((t) => t.id === active.id);
            const overIndex = weekData[activeContainer].findIndex((t) => t.id === over.id);

            if (activeIndex !== overIndex) {
                setWeekData((prev) => ({
                    ...prev,
                    [activeContainer]: arrayMove(prev[activeContainer], activeIndex, overIndex),
                }));
            }
        }
        setActiveId(null);
    }

    return {weekData, activeId, addTask, changeStatus, deleteTask, editTask, handleDragOver, handleDragStart, handleDragEnd, findActiveTask}

}