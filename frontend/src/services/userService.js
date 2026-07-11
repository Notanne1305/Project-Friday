import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

export const getUsers = () => axios.get(`${API_BASE}/users`);
export const createUser = (data) => axios.post(`${API_BASE}/users`, data);
