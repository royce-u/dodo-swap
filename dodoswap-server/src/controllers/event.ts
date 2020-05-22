import { Request, Response, Router } from 'express'
import { EventInterface } from '../models/event'

let db = require('../models')
const router = Router()

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
            res.send({ newEvent })
        })
        .catch((err: Error) => {
            console.log("error in posting event", err)
            res.send({ err })
        })
})

//PUT /event (update event when other users joint)
router.put('/', (req: Request, res: Response) => {
    console.log("REQ BODY----", req.body)
    req.body.attendee = {
        attendeeId: req.body.attendeeId,
        top5: req.body.top5,
        toBring: req.body.toBring
    }
    db.Event.updateOne({ _id: (req.body as { id: string }).id },
        { $push: {attendee: req.body.attendee} })
        .then((updatedEvent: EventInterface) => {
            res.send({ updatedEvent })
        })
        .catch((err: Error) => {
            console.log(err)
            res.send({ err })
        })
})

module.exports = router