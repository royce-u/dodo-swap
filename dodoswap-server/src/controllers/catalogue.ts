import { Request, Response, Router } from 'express'
import {ItemInterface} from '../models/item'
let db = require('../models')
const router = Router()

//GET / Displays index of all items in catalogue
router.get('/', (req: Request, res: Response) => {
    console.log("DB ITEM----", db.Item)
    db.Item.find()
    .then((items: ItemInterface[]) => {
        console.log("ITEMS HEREEEE---", items)
        res.send({items})
    })
    .catch((err: Error) => {
        console.log("error in getting items", err)
        res.send({err})
    })
})

//GET - Display show page for a single item
router.get('/:id', (req: Request, res: Response) => {
    console.log("HHHHHEREEE-", (req.params as {id: string}).id)
    db.Item.findById((req.params as {id: string}).id)
    .then((item: ItemInterface | null)=> {
        console.log("item returned--", item)
        res.send({item})
    })
    .catch((err: Error) => {
        console.log("error in getting item", err)
        res.send({err})
    })
})


module.exports = router