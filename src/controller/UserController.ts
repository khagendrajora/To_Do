import User from "../model/user";
import { Request, Response } from 'express'
import Token from "../model/token";
import jwt from 'jsonwebtoken'
const jwtSecret = 'hello'

export const userRegister = async (req: Request, res: Response) => {
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    User.findOne({ email: user.email })
        .then(async data => {
            if (data) {
                return res.status(400).json({ error: 'Used Email' })
            }
            else {
                user = await user.save()
                if (!user) {
                    return res.status(400).json({ error: "Unable to save" })
                }
                else {
                    res.send(user)
                }
            }

        }).catch(err => {
            return res.status(400).json({ error: 'failed', err })
        })
}


export const userList = async (req: Request, res: Response) => {
    let user = await User.find()
    if (!user) {
        return res.status(400).json({ error: 'failed' })
    }
    else {
        res.send(user)
    }
}


export const login = async (req: Request, res: Response) => {
    let email = req.body.email
    try {
        let userData = await User.findOne({ email })
        // .then((data) => {
        if (!userData) {
            return res.status(400).json({ error: 'Invalid Email' })
        }
        const data = {
            user: {
                id: userData._id
            }
        }
        const authToken = jwt.sign({ data }, jwtSecret)


        if (req.body.password == userData.password) {
            res.cookie("mycookie", authToken, { expires: new Date(Date.now() + 1000000) })
            return (
                res.json({
                    authTOken: authToken,
                    id: userData._id,
                    username: userData.username,
                    email: userData.email
                })
            )
        } else {
            res.status(400).json({ error: 'password wrong' })
        }
    } catch (error) {
        return res.status(400).json({ error: error })
    }
}


export const signOut = async (req: Request, res: Response) => {
    res.clearCookie('mycookie')
    res.json({ message: "SignOut Success" })
}