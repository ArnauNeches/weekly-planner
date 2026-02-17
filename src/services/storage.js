import { initialData } from "../data/initialData";

export function saveWeek(dateKey, data){
    localStorage.setItem(dateKey, JSON.stringify(data));
};

export function getWeek(dateKey){
    const data = localStorage.getItem(dateKey);
    return data ? JSON.parse(data) : initialData;
};