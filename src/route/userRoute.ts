import express from 'express'
import { login, signOut, userList, userRegister } from "../controller/UserController"

const router = express.Router()


router.post('/signup', userRegister)
router.get('/userList', userList)
router.post('/login', login)
router.post('/signout', signOut)

export default router