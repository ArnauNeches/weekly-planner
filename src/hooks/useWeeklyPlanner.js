import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { initialData } from "../data/initialData";

export default function useWeeklyPlanner(currentWeek) {

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

    return {weekData, addTask, changeStatus, deleteTask}
}