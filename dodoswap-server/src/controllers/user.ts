let db = require('../models')

import mongoose from 'mongoose'
import { Request, Response, Router } from 'express'
import { UserInterface } from '../models/user'

interface RequestInterface extends Request {
    user?: UserInterface
}

const router = Router()

//GET /user/edit (display user to edit info)
router.get('/edit', (req: RequestInterface, res: Response) => {
    db.User.findById(mongoose.Types.ObjectId(req.user ? req.user._id : ""))
    .then((user: UserInterface) => {
        res.send({user})
    })
    .catch((err: Error) => {
        console.log("error in finding user", err)
        res.send({err})
    })
})

//GET /user/:id (display a single user)
router.get('/:id', (req: Request, res: Response) => {
    db.User.findById({_id: (req.params as {id: string}).id})
    .then((user: UserInterface) => {
        res.send({user})
    })
    .catch((err: Error) => {
        console.log("error in finding user", err)
        res.send({err})
    })
})


//PUT /user/ (update user profile)
router.put('/', (req: Request, res: Response) => {
    res.send({message: "put route stub"})
})


module.exports = router