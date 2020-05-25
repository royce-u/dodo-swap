import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Decoded } from '../App'
import { Dropdown, Menu } from 'semantic-ui-react'
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

  var links = (
    <Menu pointing secondary className="top-nav">
      <Menu.Item
        name='Home'
        as={Link} to="/"
      />
      <Login user={props.user} updateToken={props.updateToken} />
    </Menu>


  )
  console.log(props.user)
  // If the user is logged in, show profile page and logout links
  if (props.user) {
    console.log("INNER PART")
    links = (
      <Menu pointing secondary>
        <Menu.Item
          name='Home'
          href="/"
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='Profile'
            as={Link} to="/user"
          />
          <Menu.Item
            name='Catalogue'
            as={Link} to="/catalogue"
          />
          <Dropdown pointing text="Events" id="event">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to= "/event">All Events</Dropdown.Item>
              <Dropdown.Item as={Link} to= "/newevent">Add Event</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item
            name='Logout'
            as={Link} to="/"
            onClick={handleLogout}
          />
        </Menu.Menu>
      </Menu>
    )

  }
  console.log("LINKS HERE", links)

  return (
    <div>
      {links}
    </div>

  )
}

export default Nav
