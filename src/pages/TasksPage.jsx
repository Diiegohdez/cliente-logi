import React, { useEffect } from 'react'
import { useTasks } from '../context/TasksContext';
import TasksCard from '../components/TasksCard'


const TasksPage = () => {
    const { getTasks, tasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, [])

    if(tasks-length == 0) return (<h1>No hay tareas</h1>);

    return (
        <div>

            {
                tasks.map((task)=>(
                    <TasksCard task={task} key={task._id}/>
                ))
            }
        </div>
    )
}

export default TasksPage;