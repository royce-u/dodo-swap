// Packages
import React from 'react'
import { Route } from 'react-router-dom'

// Custom components
import Home from './pages/Home'
import Nav from '../nav/Nav'
import Profile from './pages/Profile'
import Catalogue from './pages/Catalogue'
import { Decoded, User } from '../App'

//props
interface ContentProps {
  user: Decoded | null,
  updateToken: (newToken: string | null) => void
}


const Content: React.FC<ContentProps> = props => {
  return (
    <div className="container">
      <Nav user={props.user} updateToken={props.updateToken}/>
      <Route exact path="/" component={Home} />
      <Route path="/user" render={
        () => <Profile user={props.user} />
      } />
      <Route path="/catalogue" render={
        () => <Catalogue updateToken={props.updateToken} user={props.user}/>
      } />

    </div>
  )
}

export default Content
