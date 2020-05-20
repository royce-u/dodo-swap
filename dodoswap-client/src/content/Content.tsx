// Packages
import React from 'react'
import { Route } from 'react-router-dom'

// Custom components
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Catalogue from './pages/catalogue'
import { Decoded, User } from '../App'

//props
interface ContentProps {
  user: Decoded | null,
  updateToken: (newToken: string | null) => void
}


const Content: React.FC<ContentProps> = props => {
  return (
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route path="/login" render={
        () => <Login user={props.user} updateToken={props.updateToken} />
      } />
      <Route path="/profile" render={
        () => <Profile user={props.user} />
      } />
      <Route path="/signup" render={
        () => <Signup user={props.user} updateToken={props.updateToken} />
      } />
      <Route path="/catalogue" render={
        () => <Catalogue updateToken={props.updateToken} user={props.user}/>
      } />

    </div>
  )
}

export default Content
