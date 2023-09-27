import { createContext, useContext, useState } from "react";
import { createTasksRequest, getTaskRequest, getTasksRequest, updateTasksRequest, deleteTasksRequest } from '../api/tasks'


const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("el usTasks deberia de estar en el provider")
    }
    return context;
}

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
        } catch (error) {
            console.error(error);
        }

    };

    const createTasks = async (tasks) => {
        const res = await createTasksRequest(tasks);
        console.log(res);
    };

    const deleteTasks = async (id) => {
        try {
            const res = await deleteTasksRequest(id);
            if (res.status == 204) setTasks(tasks.filter(tasks => tasks._id != id));
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    };

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id)
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateTask = async (id, tasks) =>{
        try {
        const res = await updateTasksRequest(id, tasks)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <TaskContext.Provider value={{ tasks, createTasks, getTasks, deleteTasks, getTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
}