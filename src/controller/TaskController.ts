import Task from "../model/task";
import { Request, Response } from 'express'
import User from "../model/user";
import taskHandler from "../model/taskHandlers";


export const addTask = async (req: Request, res: Response) => {
    const { task, description, assignedTo, assignedBy, deadline } = req.body;
    try {
        const assignedToUser = await User.findById(assignedTo);
        const assignedByUser = await User.findById(assignedBy)

        if (!assignedToUser || !assignedByUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        let taskupdater = new taskHandler({
            assignedTo: assignedToUser,
            assignedBy: assignedByUser
        })
        taskupdater = await taskupdater.save()

        let tasks = new Task({
            task,
            description,
            taskHandlers: taskupdater,
            deadline
        })

        tasks = await tasks.save()
        if (!tasks) {
            return res.status(400).json({ error: "failed" })
        } else {
            res.send(tasks)
        }

    } catch (error) {
        res.status(500).json({ error: error })

    }
}

export const deleteTask = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        Task.findByIdAndDelete(id)
            .then((item) => {
                if (!item) {
                    return res.status(400).json({ error: "task not found" })
                }
                else {
                    return res.status(200).json({ message: 'Task deleted' })
                }
            }).catch(err => {
                return res.status(400).json({ error: err })
            })
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

export const updateTask = async (req: Request, res: Response) => {
    const id = req.params.id
    const { task, description, assignedTo, assignedBy, deadline, status } = req.body;
    try {
        const assignedToUser = await User.findById(assignedTo);
        const assignedByUser = await User.findById(assignedBy)

        if (!assignedToUser || !assignedByUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        let taskupdater = new taskHandler({
            assignedTo: assignedToUser,
            assignedBy: assignedByUser
        })
        taskupdater = await taskupdater.save()


        const tasks = await Task.findByIdAndUpdate(id, {
            task,
            description,
            taskHandlers: taskupdater,
            status,
            deadline
        }, { new: true })
        if (!tasks) {
            return res.status(400).json({ error: "Update Failed" })
        } else {
            res.send(tasks)

        }
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

export const taskList = async (req: Request, res: Response) => {
    const taskList = await Task.find()
        .then((data) => {
            if (!data) {
                return res.status(400).json({ error: "task not found" })
            } else {
                res.send(data)
            }
        })
}

export const taskDetail = async (req: Request, res: Response) => {
    const id = req.params.id
    await Task.findById(id)
        .then((data) => {
            if (!data) {
                return res.status(400).json({ error: "task not found" })
            }
            else {
                res.send(data)
            }
        })
}