// Packages
import React from 'react'
import { Route, Switch } from 'react-router-dom'

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
    <Switch>
      <Route exact path="/" render={
        () => <Home updateToken={props.updateToken} user={props.user} />
      } />
      <Route path="/user" render={
        () => <Profile updateToken={props.updateToken} user={props.user} />
      } />
      <Route path="/catalogue" render={
        () => <Catalogue user={props.user}/>
      } />
      <Route exact path="/event/new" render={
        () => <AddEvent updateToken={props.updateToken} user={props.user}/>
      } />
      <Route path="/event/:id" render={
        () => <EventDetails user={props.user} updateToken={props.updateToken}/>
      } />
          <Route path="/event" render={
            () => <Events user={props.user}/>
          } />

    </Switch>
  )
}

export default Content
