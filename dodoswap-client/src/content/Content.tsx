// Packages
import React from 'react'
import { Route } from 'react-router-dom'

// Custom components
import AddEvent from './pages/AddEvent'
import Catalogue from './pages/Catalogue'
import Events from './pages/Events'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { Decoded } from '../App'
import EventDetails from './pages/EventDetails'


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
        () => <Catalogue user={props.user}/>
      } />
      <Route path="/newevent" render={
        () => <AddEvent updateToken={props.updateToken} user={props.user}/>
      } />
      <Route path="/event" render={
        () => <Events user={props.user}/>
      } />
      <Route path="/events/:id" render={
        () => <EventDetails user={props.user}/>
      } />

    </div>
  )
}

export default Content
