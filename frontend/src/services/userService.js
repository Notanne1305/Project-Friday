import axios from 'axios';

const API_BASE = 'http://locallhost:80000/api';

export const getUsers = () => axios.get('{API_BASE}/users');