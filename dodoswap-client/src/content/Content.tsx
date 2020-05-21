// Packages
import React from 'react'
import { Route } from 'react-router-dom'

// Custom components
import Catalogue from './pages/Catalogue'
import Event from './pages/Events'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { Decoded } from '../App'

//props
interface ContentProps {
  user: Decoded | null,
  updateToken: (newToken: string | null) => void
}


const Content: React.FC<ContentProps> = props => {
  return (
    <div className="container">
      <Route exact path="/" render={
        () => <Home updateToken={props.updateToken} user={props.user} />
      } />
      <Route path="/user" render={
        () => <Profile updateToken={props.updateToken} user={props.user} />
      } />
      <Route path="/catalogue" render={
        () => <Catalogue updateToken={props.updateToken} user={props.user}/>
      } />
      <Route path="/events" render={
        () => <Event updateToken={props.updateToken} user={props.user}/>
      } />

    </div>
  )
}

export default Content