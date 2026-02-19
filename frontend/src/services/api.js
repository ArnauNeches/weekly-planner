export function saveWeek(dateKey, data){
    localStorage.setItem(dateKey, JSON.stringify(data));
};

export async function getWeekAPI(dateKey){
    const response = await fetch(`/api/tasks/week/${dateKey}`);
    if (!response.ok) throw new Error("Failed to fetch week");
    return await response.json();
};

export async function deleteTaskAPI(taskId){
    await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
    });
}

export async function addTaskAPI(newEntry){
    await fetch(`/api/tasks/`, {
        method: 'POST',
        body: JSON.stringify(newEntry),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}