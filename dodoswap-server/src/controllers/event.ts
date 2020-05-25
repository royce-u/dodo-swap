import { Request, Response, Router } from 'express'
import { EventInterface } from '../models/event'
import { UserInterface } from '../models/user'
import mongoose from 'mongoose'

let db = require('../models')
const router = Router()
interface RequestInterface extends Request {
    user?: UserInterface
}
//GET / Displays index of all events
router.get('/', (req: Request, res: Response) => {
    db.Event.find()
        .populate('User')
        .then((events: EventInterface[]) => {
            console.log("events HEREEEE---", events)
            res.send({ events })
        })
        .catch((err: Error) => {
            console.log("error in getting events", err)
            res.send({ err })
        })
})

//GET - Display show page for a single event
router.get('/:id', (req: Request, res: Response) => {
    console.log("EVENTS ONE-", (req.params as { id: string }).id)
    db.Event.findById((req.params as { id: string }).id)
    .populate('attendees')
    .populate('hostId')
        .then((event: EventInterface | null) => {
            console.log("event returned--", event)
            res.send({ event })
        })
        .catch((err: Error) => {
            console.log("error in getting item", err)
            res.send({ err })
        })
})


// POST to /event
router.post('/', (req: Request, res: Response) => {
    db.Event.create(req.body)
        .then((newEvent: EventInterface) => {
            console.log('new new ---------.',newEvent)
            db.User.updateOne({_id: (req.body as {hostId: string}).hostId},
            {$push:{
                events: newEvent._id
            }
            })
            .then((updatedUser: UserInterface) => {
                console.log('updatedUser--->', updatedUser)
            })
            .catch((innErr: Error) => {
                console.log(innErr)})
            res.send({ newEvent })
            console.log('logged new event')
        })
        .catch((err: Error) => {
            console.log("error in posting event", err)
            res.send({ err })
        })
})

//PUT /event (update event when other users join)
router.put('/', (req: RequestInterface, res: Response) => {
    console.log("REQ BODY----", req.body)
    req.body.top5 = req.body.top5 ? (Array.isArray(req.body.top5) ? req.body.top5 : [req.body.top5]) : []
    let top5 = req.body.top5.map((t: string) => mongoose.Types.ObjectId(t))
    req.body.toBring = req.body.toBring ? (Array.isArray(req.body.toBring) ? req.body.toBring : [req.body.toBring]) : []
    let toBring = req.body.toBring.map((t: string) => mongoose.Types.ObjectId(t))

    req.body.attendee = {
        attendeeId: mongoose.Types.ObjectId(req.user ? req.user._id : ""),
        top5: top5,
        toBring: toBring
    }
    db.Event.updateOne({ _id: (req.body as { id: string }).id },
        { $push: {attendees: req.body.attendee} })
        .then((updatedEvent: EventInterface) => {
            res.send({ updatedEvent })
        })
        .catch((err: Error) => {
            console.log(err)
            res.send({ err })
        })
})

module.exports = router