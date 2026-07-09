import axios from 'axios';

const API_BASE = 'http:localhost:8000/api';

export const getTasks = () => axios.get('${API_BASE}/tasks');
export const createTask = (data) => axios.post('${API_BASE}/tasks', data);
export const getMyTasks = (userId) => axios.get('${API_BASE}/my-tasks/${userId}');
export const updateTaskStatus = (taskId, status)=>
    axios.patch('${API_BASE}/tasks/${taskId}/status', { status }) ;