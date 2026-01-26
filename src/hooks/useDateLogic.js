import { useState } from "react";

function getLastMonday(){
    const result = new Date();
    const day = result.getDay();

    const diff = day === 0 ? 6 : day - 1;
    result.setDate(result.getDate() - diff)
    return result;
}

export default function useDateLogic(){
    const [currentWeek, setCurrentWeek] = useState(()=>getLastMonday());

    function nextWeek(){
        setCurrentWeek(prev=>{
            const result = new Date(prev);
            result.setDate(result.getDate() + 7);
            return result;
        });
    };

    function prevWeek(){
        setCurrentWeek(prev=>{
            const result = new Date(prev);
            result.setDate(result.getDate() - 7);
            return result;
        });
    };

    function getNextSunday(monday){
        const result = new Date(monday);
        result.setDate(result.getDate() + 6);
        return result;
    }

    return {currentWeek, prevWeek, nextWeek, getNextSunday};
}