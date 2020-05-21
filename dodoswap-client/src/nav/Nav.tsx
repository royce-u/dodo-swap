import React, { FormEvent } from 'react'
import { Decoded } from '../App'
import { Menu } from 'semantic-ui-react'
import Login from '../content/pages/Login'

//props
interface NavProps {
  user: Decoded | null,
  updateToken: (newToken: string | null) => void
}

const Nav: React.FC<NavProps> = props => {
  const handleLogout = (e: FormEvent) => {
    e.preventDefault()
    // Remove the token from local storage (or cookies)
    props.updateToken('')
    localStorage.removeItem('boilerToken')
    
  }

  let links = (
    <Menu pointing secondary>
        <Menu.Item 
        name='Home' 
        href="/"
        />
        <Login user={props.user} updateToken={props.updateToken}/>
    </Menu>
      

  )

  // If the user is logged in, show profile page and logout links
  if (props.user) {
    links = (
      <Menu pointing secondary>
        <Menu.Item 
        name='Home' 
        href="/"
        />
      <Menu.Menu position='right'>
      <Menu.Item 
        name='Profile' 
        href="/user"
        />
      <Menu.Item 
        name='Catalogue' 
        href="/catalogue"
        />
      <Menu.Item 
        name='Events' 
        href="/events"
        />
      <Menu.Item 
        name='Logout' 
        href="/"
        onClick={handleLogout}
        />      
      </Menu.Menu>
    </Menu>
    )
  }

  return (
    <div>
        {links}
    </div>

  )
}

export default Nav
