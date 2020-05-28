require('dotenv').config()
let db = require('../models')
let jwt = require('jsonwebtoken')

import mongoose from 'mongoose'
import { Request, Response, Router } from 'express'
import { UserInterface } from '../models/user'


interface RequestInterface extends Request {
    user?: UserInterface
}


const router = Router()
//GET / (display user profile page using token)
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
//GET /events (display user profile page using token then take the user id and get events
router.get('/events', (req: RequestInterface, res: Response) => {
    db.User.findOne({_id: (mongoose.Types.ObjectId(req.user ? req.user._id : ""))})
    .populate('events')
        .then((user: UserInterface) => {
            console.log("USER", user)
            // .then(() => {
            //     db.Event.findOne({})
            // })
                res.send({user})
        })
        .catch((err: Error) => {
            console.log("error in finding user", err)
            res.send({ err })
        })
})

//GET /inventory (display user profile page using token then take the user id and get rest of inventory, wishlist and events data)
router.get('/inventory', (req: RequestInterface, res: Response) => {
    db.User.findOne({_id: (mongoose.Types.ObjectId(req.user ? req.user._id : ""))})
    .populate('inventory')
        .then((user: UserInterface) => {
            console.log("USER", user)
                res.send({user})

        })
        .catch((err: Error) => {
            console.log("error in finding user", err)
            res.send({ err })
        })
})
//GET /wishlist (display user profile page using token then take the user id and get rest of inventory, wishlist and events data)
router.get('/wishlist', (req: RequestInterface, res: Response) => {
    db.User.findOne({_id: (mongoose.Types.ObjectId(req.user ? req.user._id : ""))})
    .populate('wishList')
        .then((user: UserInterface) => {
                res.send({user})

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
    console.log('UPDATE BODY', req.body)
    db.User.updateOne({ _id: (req.body as{id: string}).id }, req.body)
    .then(() => {
        db.User.findOne({_id: (req.body as{id: string}).id })
        .then((user: UserInterface) => {
            // Reissues token
            let token: string = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 8 //8 hours in seconds
            })
            res.send({ token })
        })
    })
    .catch((error: Error) => {
        console.log(error)
        res.status(500).send({ message: 'Server Error' })
    })
})


//PUT /user/wishlist (update user's wishlist)
router.put('/wishlist', (req: Request, res: Response) => {
    console.log("REQ BODY WISHLIST----", req.body)
    db.User.updateOne({ _id: (req.body as { chicken: string }).chicken },
        {$addToSet: {
                wishList: req.body.wishList
            }
        })
        .then((user: UserInterface) => {
            res.send({ user })
        })
        .catch((err: Error) => {
            console.log(err)
            res.send({ err })
        })
})
//PUT /user/wishlist (update user's wishlist) $addToSet only adds items not in list
router.put('/inventory', (req: Request, res: Response) => {
    console.log("REQ BODY INVENTORY----", req.body)
    db.User.updateOne({ _id: (req.body as { chicken: string }).chicken },
        {$addToSet: {
                inventory: req.body.inventory
            }
        })
        .then((user: UserInterface) => {
            res.send({ user })
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

// //GET /user/events (displays My Events)
// router.get('/myevents', (req: Request, res: Response) => {
//     db.Event.find({
//             hostId: req.user._id
//         })
// })

module.exports = router