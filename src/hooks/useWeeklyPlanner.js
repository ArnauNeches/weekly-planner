import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { initialData, DAYS } from "../data/initialData";
import { arrayMove } from "@dnd-kit/sortable";

export default function useWeeklyPlanner(currentWeek) {

    function findActiveTask(id) {
        for (const day of DAYS){
            const task = weekData[day]?.find(t => t.id === id);
            if (task) return task;
        }
        return null;
    }

    const [activeId, setActiveId] = useState(null);
    const [weekData, setWeekData] = useState(() => {
        const storage = localStorage.getItem(`week-${currentWeek.toLocaleDateString()}`);
        if (storage) return JSON.parse(storage);
        return initialData;
    }
    );

    useEffect(() => {
        const newData = JSON.stringify(weekData);
        localStorage.setItem(`week-${currentWeek.toLocaleDateString()}`, newData);
    }, [weekData]);

    function deleteTask(day, id) {
        const dayKey = day.toLowerCase();

        setWeekData(prevWeekData => {
            return ({
                ...prevWeekData,
                [dayKey]: [
                    ...prevWeekData[dayKey].filter(task => task.id !== id)
                ]
            })
        });
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

    function addTask(day, text) {

        setWeekData(prevWeekData => {
            const newEntry = {
                id: uuidv4(),
                name: text,
                status: 'pending',
                createdAt: new Date().toLocaleDateString()
            }

            return ({
                ...prevWeekData,
                [day.toLowerCase()]: [
                    ...prevWeekData[day.toLowerCase()],
                    newEntry
                ]
            })
        });
    }

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        setActiveId(null);

        if (!over || active.id === over.id) return;

        setWeekData((prev) => {
            const activeDay = Object.keys(prev).find((day) => prev[day].some((task) => task.id === active.id));

            if (!activeDay) return prev;

            const oldIndex = prev[activeDay].findIndex((task) => task.id === active.id);
            const newIndex = prev[activeDay].findIndex((task) => task.id === over.id);

            return {
                ...prev,
                [activeDay]: arrayMove(prev[activeDay], oldIndex, newIndex)
            }
        });
    }

    return {weekData, activeId, addTask, changeStatus, deleteTask, handleDragStart, handleDragEnd, findActiveTask}

}