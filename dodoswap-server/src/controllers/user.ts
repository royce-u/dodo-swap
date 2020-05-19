let db = require('../models')

import { Request, Response, Router } from 'express'
import User from '../models/user'


const router = Router()

//GET /user/:id (display a single user)
router.get('/:id', (req: Request, res: Response) => {
    console.log("User-----", req.params.id)
    db.User.findById({_id: (req.params as {id: string}).id})
    .then((user: User) => {
        res.send({user})
    })
})

module.exports = router