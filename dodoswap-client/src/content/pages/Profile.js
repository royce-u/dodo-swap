import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const Profile = props => {
  let [secretMessage, setSecretMessage] = useState('') 

  useEffect(()=> {
    //Grab token from local storage
    let token = localStorage.getItem('boilerToken')

    //Make a call to a protected route
    fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
      headers: {
        'Authorization':  `Bearer ${token}`
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
        setSecretMessage('YELLLO! WECOME')
      })
    })
    .catch(err => {
      console.log(err)
      setSecretMessage('No message for you')
    })
  })
  //Make sure there is a user before trying to show their info
  if (!props.user) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <h2>{props.user.firstname}</h2>
      <img src={props.user.pic} alt={props.user.firstname}/>
      <p>{secretMessage}</p>
    </div>
  )
}

export default Profile
