let db = require('../models')

import { Request, Response, Router } from 'express'
import Item from '../models/item'

const router = Router()

//GET / Displays index of all items in catalogue
router.get('/', (req: Request, res: Response) => {
    db.Item.find()
    .then((items: Item) => {
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
    db.Item.findById(req.params.id)
    .then((item: Item)=> {
        console.log("item returned--", item)
        res.send({item})
    })
    .catch((err: Error) => {
        console.log("error in getting item", err)
        res.send({err})
    })
})


module.exports = router