import axios from './axios';


export const getTasksRequest = () => axios.get('/task');

export const getTaskRequest = (id) => axios.get(`/task/${id}`);

export const createTasksRequest = (tasks) => axios.post('/task', tasks);

export const updateTasksRequest = (id, tasks) => axios.put(`/task/${id}`, tasks);

export const deleteTasksRequest = (id) => axios.delete(`/task/${id}`);

