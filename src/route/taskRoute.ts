import express from 'express'

import { addTask, deleteTask, taskDetail, taskList, updateTask } from './../controller/TaskController';

const router = express.Router()


router.post('/addTask', addTask)
router.delete('/deleteTask/:id', deleteTask)
router.put('/updateTask/:id', updateTask)
router.get('/taskList', taskList)
router.get('/taskDetail/:id', taskDetail)

export default router