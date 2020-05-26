import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Decoded } from '../../App'
import { Container, Tab, } from 'semantic-ui-react'

import MyEvents from './MyEvents'
import MyInventory from './MyInventory'
import MyWishList from './MyWishList'
import ProfileBox from './ProfileBox'


//props
interface ProfileProps {
  user: Decoded | null,
  updateToken: (newToken: string | null) => void
}

const Profile: React.FC<ProfileProps> = props => {
  let [secretMessage, setSecretMessage] = useState('')


  useEffect(() => {
    //Grab token from local storage
    let token = localStorage.getItem('boilerToken')

    //Make a call to a protected route
    fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Response', response)

        if (!response.ok) {
          setSecretMessage('Nice try')
          return
        }
        //we did get a good response
        response.json()
          .then(result => {
            console.log(result)
            setSecretMessage('HELLLO! WELCOME')
          })
      })
      .catch(err => {
        console.log(err)
        setSecretMessage('No message for you')
      })
  }, [])
  // console.log("PROPS USER", props.user)



  //User profile panes
  const panes = [
    { menuItem: 'My Events', render: () => <Tab.Pane><MyEvents /></Tab.Pane> },
    { menuItem: 'My Wishlist', render: () => <Tab.Pane><MyWishList /></Tab.Pane> },
    { menuItem: 'My Inventory', render: () => <Tab.Pane><MyInventory /></Tab.Pane> }
  ]


  //Make sure there is a user before trying to show their info
  if (!props.user) {
    return <Redirect to="/" />
  }


  return (
    <Container>
      <h1>PASSPORT</h1>
      <ProfileBox user={props.user} updateToken={props.updateToken}/>
      <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
    </Container >
  )
}

export default Profile
