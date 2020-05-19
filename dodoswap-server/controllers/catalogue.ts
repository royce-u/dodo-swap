let Item = require('../models/item')


import { Request, Response, Router } from 'express'
import User from '../models/user'
import Item from '../models/item'

const router = Router()

//GET / Displays index of all categories
router.get('/', (req: Request, res: Response) => {
    console.log('catalogue')
    res.send({message: 'catalogue index'})
})

//GET - Display show page for a single item
router.get('/:id', (req: Request, res: Response) => {
    console.log('/:id')
    res.send({message: 'stub route for/:id'})
})


module.exports = router