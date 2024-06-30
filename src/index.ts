import express, { Express, Request, Response } from "express"
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import './db/db'

const app: Express = express()
app.use(cors())
app.use(express.json())
// app.use(cors())

import userRoute from './route/userRoute'
import taskRoute from './route/taskRoute'
app.use('/api', userRoute)
app.use('/api', taskRoute)


const port: number = 5000
app.get('/', (req: Request, res: Response) => {
    res.send('Express node + typescript project')
})

app.listen(port, () => {
    console.log(`Server listned on port ${port}`)
})
