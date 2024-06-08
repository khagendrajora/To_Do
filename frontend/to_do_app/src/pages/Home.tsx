import { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../Config'
import { AddTask } from './AddTask';


interface TaskHandlers {
    assignedTo: {
        _id: string;
        username: string;
        email: string;
        password: string;
        __v: number;
    };
    assignedBy: {
        _id: string;
        username: string;
        email: string;
        password: string;
        __v: number;
    };
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface taskProp {

    _id: string,
    task: string,
    description: string,
    taskHandlers: TaskHandlers,
    deadline: string,
    status: string

}



const Home = () => {
    const [tasks, setTasks] = useState<taskProp[]>([])
    const [task, setTask] = useState<taskProp | null>(null)



    useEffect(() => {
        axios.get(`${API}/taskList`)
            .then(res => {
                setTasks(res.data)

            }).catch(err => console.log(err))


    }, [])


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
                taskHandler: task?.taskHandlers,
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
    return (
        <>
            <div className='bg-background min-w-full pb-4 flex-col' >
                <div className='h1 flex justify-center'>
                    <h1 className='text-text text-2xl md:text-6xl  p-3'>My Todos</h1>
                </div>
                <AddTask />

                {tasks && tasks.map((tasks, i) =>


                    <div className='task-container rounded-xl bg-component w-64 mt-1 m-auto flex flex-row justify-around p-1  md:w-[700px] lg:w-[900px]' key={i}>
                        <div className='flex flex-col space-y-1 w-2/3'>

                            <div className='heading text-title text-2xl'>{tasks.task} </div>
                            <h6 className='assignedTo'>To:{tasks.taskHandlers?.assignedTo?.username}</h6>
                            <div className='des text-description break-words'>{tasks.description}</div>
                            <div className='deadline text-deadline text-sm'>Deadline: {tasks.deadline}</div>
                        </div>
                        <div className='button flex flex-col md:flex-row md:text-3xl md:justify-center items-center space-y-3 md:space-y-0 md:space-x-6'>
                            {
                                tasks.status == "complete" ? (

                                    <button className='status-btn bg-green-800 font-thin rounded-lg p-1'>Complete</button>
                                ) : (
                                    <button className='status-btn text-lime-300 border-2 border-lime-400 rounded-lg p-0.5  ' onClick={() => handleStatus(tasks._id)}>Pending</button>
                                )
                            }
                            <button className='del-btn text-red-600 border-2 rounded-lg p-0.5 border-red-600' onClick={() => handleDel(tasks._id)}>Delete</button>
                            <button className='update-btn text-blue-700 border-2 rounded-lg p-0.5 border-blue-700'>Update</button>
                        </div>
                    </div>
                )

                }
            </div >



        </>
    )
}

export default Home