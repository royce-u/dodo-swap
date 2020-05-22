let db = require('../models')
let jwt = require('jsonwebtoken')

import mongoose from 'mongoose'
import { Request, Response, Router } from 'express'
import { UserInterface } from '../models/user'
import { ItemInterface } from '../models/item'

interface RequestInterface extends Request {
    user?: UserInterface
}

// //check is item
// function isItem(obj: ItemInterface[] | any) : obj is ItemInterface[] {
//     return true
// }

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
//GET /inventory (display user profile page using token then take the user id and get rest of inventory, wishlist and events data)
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
    console.log("REQ BODY----", req.body)
    db.User.updateOne({ _id: (req.body as { id: string }).id }, { $set: req.body })
        .then((user: UserInterface) => {
            //Reissue token with updated user info
            let token: string = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 8 //8 hours in seconds
            })
            res.send({ token })
        })
        .catch((err: Error) => {
            console.log(err)
            res.send({ err })
        })
})



//PUT /user/wishlist (update user's wishlist)
router.put('/wishlist', (req: Request, res: Response) => {
    console.log("REQ BODY----", req.body)
    console.log(req.body.id)
    db.User.updateOne({ _id: (req.body as { chicken: string }).chicken },
        {$push: {
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
//PUT /user/wishlist (update user's wishlist)
router.put('/inventory', (req: Request, res: Response) => {
    console.log("REQ BODY----", req.body)
    db.User.updateOne({ _id: (req.body as { id: string }).id },
        {$push: {
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



module.exports = router