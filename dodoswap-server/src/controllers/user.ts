let db = require('../models')
let jwt = require('jsonwebtoken')

import mongoose from 'mongoose'
import { Request, Response, Router } from 'express'
import { UserInterface } from '../models/user'

interface RequestInterface extends Request {
    user?: UserInterface
}

const router = Router()
//GET / (display user profile page)
router.get('/', (req: RequestInterface, res: Response) => {
    db.User.findById(mongoose.Types.ObjectId(req.user ? req.user._id : ""))
        .then((user: UserInterface) => {
            res.send({ user })
        })
        .catch((err: Error) => {
            console.log("error in finding user", err)
            res.send({ err })
        })
})

//GET /user/edit (display form for user that is logged in to edit profile info)
router.get('/edit', (req: RequestInterface, res: Response) => {
    db.User.findById(mongoose.Types.ObjectId(req.user ? req.user._id : ""))
        .then((user: UserInterface) => {
            res.send({ user })
        })
        .catch((err: Error) => {
            console.log("error in finding user", err)
            res.send({ err })
        })
})

//PUT /user/ (update user profile)
router.put('/', (req: Request, res: Response) => {
    console.log("REQ BODY----", req.body)
    db.User.updateOne({ _id: (req.body as { id: string }).id }, {$set: req.body})
        .then((user: UserInterface) => {
            //Reissue token with updated user info
            let token: string = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 8 //8 hours in seconds
              })
              res.send({token})
        })
        .catch((err: Error) => {
            console.log(err)
            res.send({ err })
        })
})

//GET /user/:id (display a single user)
router.get('/:id', (req: Request, res: Response) => {
    db.User.findById({ _id: (req.params as { id: string }).id })
        .then((user: UserInterface) => {
            res.send({ user })
        })
        .catch((err: Error) => {
            console.log("error in finding user", err)
            res.send({ err })
        })
})



module.exports = router