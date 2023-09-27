import React, { useEffect } from 'react';
import "./tasksFormPage.css";
import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';

const TasksFormPage = () => {
    const { register, handleSubmit, setValue } = useForm();
    const { tasks, createTasks, getTask, updateTask } = useTasks();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await getTask(params.id);
                console.log(task);
                setValue('title', task.title)
                setValue('description', task.description)
            }
        }
        loadTask()
    }, []);

    const Onsubmit = handleSubmit((data) => {
        if (params.id) {
            updateTask(params.id, data);
        } else {
            createTasks(data);
        }
        navigate('/tasks')
    });

    return (
        <div className='TasksFormPage'>
            
            <form onSubmit={Onsubmit}>
            <h1>Notas</h1>
                <input type='text' placeholder='titulo'
                    {...register("title")}
                    autoFocus />

                <textarea rows="3" placeholder='Descripcion'
                    {...register("description")}></textarea>
                <button>Guardar</button>
            </form>
        </div>
    )
}

export default TasksFormPage;