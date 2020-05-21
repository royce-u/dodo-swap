import { Request, Response, Router } from 'express'
import {EventInterface} from '../models/event'
import {UserInterface} from '../models/user'

let db = require('../models')
const router = Router()

//GET / Displays index of all events
router.get('/', (req: Request, res: Response) => {
    console.log("DB EVENTS----", db.Event)
    db.Event.find()
    .then((events: EventInterface[]) => {
        console.log("events HEREEEE---", events)
        res.send({events})
    })
    .catch((err: Error) => {
        console.log("error in getting events", err)
        res.send({err})
    })
})

//GET - Display show page for a single event
router.get('/:id', (req: Request, res: Response) => {
    console.log("EVENTS ONE-", (req.params as {id: string}).id)
    db.Event.findById((req.params as {id: string}).id)
    .then((item: EventInterface | null)=> {
        console.log("event returned--", event)
        res.send({event})
    })
    .catch((err: Error) => {
        console.log("error in getting item", err)
        res.send({err})
    })
})


// POST to /event
router.post('/', (req: Request, res: Response) => {
    res.send({message: "EVENT POST"})

})


module.exports = router