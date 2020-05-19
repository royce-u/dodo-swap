import { Request, Response, Router } from 'express'

const router = Router()

// NOTE: User should be logged in to access this route
router.get('/', (req: Request, res: Response) => {
    // The user is logged in, so req.user should have data!
    // TODO: Anything you want here!
  
    // NOTE: This is the user data from the time the token was issued
    // WARNING: If you update the user info those changes will not be reflected here
    // To avoid this, reissue a token when you update user data
    res.send({ message: 'Dodo Swap server' })
  })
  
  module.exports = router