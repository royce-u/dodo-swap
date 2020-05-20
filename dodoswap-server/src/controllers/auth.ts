//Declare variables and import dependencies
require('dotenv').config()
let db = require('../models')
let jwt = require('jsonwebtoken')

import { Request, Response, Router } from 'express'
import User, { UserInterface } from '../models/user'

const router = Router()

// POST /auth/login (find and validate user; send token)
router.post('/login', (req: Request, res: Response) => {
  //Declare email and password variables
  const email = (req.body as {email: string}).email
  const password = (req.body as {password: string}).password 
  console.log(req.body)

  //Look up the user by email to make sure they are "new"
  db.User.findOne({ email: email })
  .then((user: UserInterface) => {
    //check if user exists
    if (!user) {
      //They don't have an account, send error message
      return res.status(404).send( { message: 'User not found'})
    }
    //They exist - but make sure they have a correct password
    if (!user.validPassword(user, password)) {
      //Incorrect password, send error back
      return res.status(401).send({ message: 'Invalid credentials'})
    }
    //We have a good user - make them a new token, send it to them
    let token: string = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 8 //8 hours in seconds
    })
    res.send({token})
  })
  .catch((err: any) => {
    console.log('Error in POST /auth/login', err)
    res.status(503).send({ message: 'Server-side or DB error '})
  })
})

// POST to /auth/signup (create user; generate token)
router.post('/signup', (req: Request, res: Response) => {
  console.log(req.body)
 //Declare email and password variables
 const email = (req.body as {email: string}).email

  //Look up the user by email to make sure they are "new"
  db.User.findOne({email: email})
  .then((user: UserInterface) => {
    //if user exists already then do NOT let them create another account
    if (user) {
      //nono! sign in instead
      return res.status(409).send({ message: 'Email address in use'})
    }
    //we know the user is legitimately a new user: CREATE A NEW ACCOUNT
    db.User.create(req.body) 
      .then((newUser: UserInterface) => {
        //Yay! Things worked and user exists now. create a token for the new user
        let token: string = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET, {
          expiresIn: 120 //60 * 60 * 8 //8 hours, in seconds
        })
        res.send({ token })
      })
      .catch((innerErr: any) => {
        console.log('Error creating user', innerErr)
        if (innerErr.name === 'ValidationError') {
          res.status(412).send({ message: `Validation Error!' ${innerErr.message}.`})
        }
        else {
          res.status(500).send({ message: 'Error creating user'})
        }
      })
    })
  .catch((err: any) => {
    console.log("ERROR IN POST /auth/signup", err)
    res.status(503).send({ message: 'Database or server error'})
  })
})


module.exports = router
