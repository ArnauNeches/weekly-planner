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

export async function updateTaskAPI(taskId, updates){
    await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates) 
    });
}

export async function moveTaskAPI(taskId, updates) {
    await fetch(`/api/tasks/${taskId}/move`, {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(updates)
    });
}