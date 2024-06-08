import React, { ChangeEvent, useState } from 'react'
import { API } from '../Config'
import axios from 'axios'


interface addtask {
    task: string,
    description: string,
    assignedTo: string,
    assignedBy: string,
    deadline: string
}
export const AddTask: React.FC = () => {
    const [newTask, setNewTask] = useState<addtask>({
        task: '',
        description: '',
        assignedTo: '',
        assignedBy: '',
        deadline: ''
    })
    const {
        task,
        description,
        assignedTo,
        assignedBy,
        deadline
    } = newTask

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setNewTask({
            ...newTask,

            [name]: value
        })
    }

    const addTask = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
        event.preventDefault()
        try {
            const data = {
                task: newTask.task,
                description: newTask.description,
                assignedTo: newTask.assignedTo,
                assignedBy: newTask.assignedBy,
                deadline: newTask.deadline
            }
            const Config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            const response = await axios.post(`${API}/addTask`, data, Config)
            if (response.status === 200) {
                console.log("task added successfully")
                setNewTask({
                    task: '',
                    description: '',
                    assignedTo: '',
                    assignedBy: '',
                    deadline: ''

                })
            } else {
                console.log("Failed to add task");
            }

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <div className='form bg-component w-64 md:w-[700px] lg:w-[900px]  m-auto rounded-xl'>
                <form className='flex lg:flex-row sm:flex-col md:flex-row md:justify-evenly flex-wrap sm:space-y-2 p-4  '>
                    <label htmlFor='task' className='form-control'></label>
                    <input type='text' className='form-control rounded-sm p-1' name='task' placeholder='Enter Task' id='task' onChange={handleChange} value={task} />
                    <label htmlFor='description' className='form-control'></label>
                    <input type='text' className='form-control rounded-sm p-1' name='description' placeholder='Enter description' onChange={handleChange} value={description} />
                    <label htmlFor='assignedBy' className='form-control'></label>
                    <input type='text' className='form-control rounded-sm p-1' name='assignedBy' placeholder='Assigned By' onChange={handleChange} value={assignedBy} />
                    <label htmlFor='assignedTo' className='form-control'></label>
                    <input type='text' className='form-control rounded-sm p-1' name='assignedTo' placeholder='Assigned To' onChange={handleChange} value={assignedTo} />
                    <label htmlFor='deadline' className='form-control'></label>
                    <input type='text' className='form-control rounded-sm p-1' name='deadline' placeholder='Enter Deadline' onChange={handleChange} value={deadline} />
                    <button className='btn bg-buttonbg p-1 rounded-lg' onClick={addTask}>Add Task</button>
                </form>
            </div>


        </>
    )
}
