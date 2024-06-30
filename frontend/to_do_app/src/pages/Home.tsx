import { useEffect, useState, ChangeEvent } from 'react'
import axios from 'axios'
import { API } from '../Config'
import { Navbar } from '../conponents/Navbar'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip'







interface taskProp {

    _id: string,
    task: string,
    description: string,
    assignedTo: string,
    assignedBy: string,
    // taskHandlers: TaskHandlers,
    deadline: string,
    status: string

}

interface addtask {
    task: string,
    description: string,
    assignedTo: string,
    assignedBy: string,
    deadline: string
}

const Home = () => {
    const [tasks, setTasks] = useState<taskProp[]>([])
    const [task, setTask] = useState<taskProp | null>(null)
    const [newTask, setNewTask] = useState<addtask>({
        task: '',
        description: '',
        assignedTo: '',
        assignedBy: '',
        deadline: ''
    })

    useEffect(() => {
        axios.get(`${API}/taskList`)
            .then(res => {
                setTasks(res.data)

            }).catch(err => console.log(err))
    })


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

    const handleStatus = async (id: string) => {
        try {
            const res = await axios.get(`${API}/taskDetail/${id}`)
            const taskToUpdate = res.data;

            console.log(taskToUpdate)
            setTask(taskToUpdate)
            const item = {
                deadline: task?.deadline,
                status: "complete",
                task: task?.task,
                assignedTo: task?.assignedTo,
                assignedBy: task?.assignedBy,
                // taskHandler: task?.taskHandlers,
                description: task?.description

            }
            const Config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }

            await axios.put(`${API}/updateTask/${id}`, item, Config)
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleDel = async (id: string) => {
        await axios.delete(`${API}/deleteTask/${id}`)
            .then(() => {
                setTasks(tasks.filter(i => i._id != id))
            }).catch(err => {
                console.log(err)
            })
    }


    const update = async (id: string) => {
        try {
            const res = await axios.get(`${API}/taskDetail/${id}`);
            const taskToUpdate = res.data;
            setNewTask({
                task: taskToUpdate.task,
                description: taskToUpdate.description,
                assignedTo: taskToUpdate.assignedTo,
                assignedBy: taskToUpdate.assignedBy,
                deadline: taskToUpdate.deadline
            });
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <Navbar />
            <Tooltip id="my-tooltip" />
            <div className='bg-background min-w-full pb-4 flex-col' >

                {/* <AddTask /> */}
                <div className='form bg-component w-64 md:w-[700px] lg:w-[900px]  m-auto  rounded-xl'>
                    <div className=''>

                        <form className='flex lg:flex-row sm:flex-col md:flex-row md:justify-evenly  flex-wrap sm:space-y-2 p-4 '>
                            <label htmlFor='task' className='form-control'></label>
                            <input type='text' className='form-control rounded-sm p-1' name='task' placeholder='Enter Task' id='task' onChange={handleChange} value={newTask.task} />
                            <label htmlFor='description' className='form-control'></label>
                            <input type='text' className='form-control rounded-sm p-1' name='description' placeholder='Enter description' onChange={handleChange} value={newTask.description} />
                            <label htmlFor='assignedBy' className='form-control'></label>
                            <input type='text' className='form-control rounded-sm p-1' name='assignedBy' placeholder='Assigned By' onChange={handleChange} value={newTask.assignedBy} />
                            <label htmlFor='assignedTo' className='form-control'></label>
                            <input type='text' className='form-control rounded-sm p-1' name='assignedTo' placeholder='Assigned To' onChange={handleChange} value={newTask.assignedTo} />
                            <label htmlFor='deadline' className='form-control'></label>
                            <input type='text' className='form-control rounded-sm p-1' name='deadline' placeholder='Enter Deadline' onChange={handleChange} value={newTask.deadline} />
                            <button className='btn bg-buttonbg p-1 rounded-lg' onClick={addTask}>Add Task</button>
                        </form>
                    </div>
                </div>

                <div className='h1 flex justify-center'>
                    <h1 className='text-white text-2xl md:text-6xl  p-3'>My Todos</h1>
                </div>

                {tasks && tasks.map((tasks, i) =>
                    <div className='task-container rounded-xl bg-white w-64 mt-1 m-auto flex flex-row justify-around p-1  md:w-[700px] lg:w-[900px]' key={i}>
                        <div className='flex flex-col space-y-1 w-2/3'>
                            <div className='heading text-title text-2xl'>{tasks.task} </div>
                            <h6 className='assignedTo'>To:{tasks.assignedTo}</h6>
                            <h6 className='assignedTo'>To:{tasks.assignedBy}</h6>

                            <div className='des text-slate-300 break-words'>{tasks.description}</div>
                            <div className='deadline text-deadline text-sm'>Deadline: {tasks.deadline}</div>
                        </div>
                        <div className='button flex flex-col md:flex-row md:text-3xl md:justify-center items-center space-y-3 md:space-y-0 md:space-x-6'>
                            {
                                tasks.status == "complete" ? (

                                    <button className='status-btn text-lime-300 font-thin rounded-lg p-1'
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content='Completed'
                                        data-tooltip-class-name='completed'
                                        data-tooltip-place='top'
                                    ><FontAwesomeIcon size='1x' icon={faCircleCheck} /></button>
                                ) : (
                                    <button className='status-btn  rounded-lg p-0.5'
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content='Pending'
                                        data-tooltip-class-name='pending'
                                        data-tooltip-place='top'
                                        onClick={() => handleStatus(tasks._id)}><FontAwesomeIcon size='1x' icon={faCircleCheck} /></button>
                                )
                            }
                            <button className='del-btn text-red-500  rounded-lg p-0.5' data-tooltip-id="my-tooltip"
                                data-tooltip-content='Delete'
                                data-tooltip-class-name='delete'
                                data-tooltip-place='top'
                                onClick={() => handleDel(tasks._id)}><FontAwesomeIcon size='1x' icon={faTrash} /></button>
                            <button className='update-btn text-blue-700  rounded-lg p-0.5'
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content='Update'
                                data-tooltip-class-name='update'
                                data-tooltip-place='top'
                                onClick={() => update(tasks._id)} ><FontAwesomeIcon size='1x' icon={faPenToSquare} /></button>
                        </div>
                    </div>
                )
                }
            </div >
        </>
    )
}

export default Home