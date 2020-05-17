// Import packages
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// Resources and custom components
import './App.css';
import Content from './content/Content'
import Footer from './nav/Footer'
import Header from './nav/Header'
import Nav from './nav/Nav'

const App = props => {
  // Declare state variables
  let [user, setUser] = useState(null)

  //useEffect hook (on load)
  useEffect(() => {
    decodeToken()
  }, []) //Empty array, meaning only run this on page load

  const decodeToken = () => {
    let token = localStorage.getItem('boilerToken')

    if (token) {
      //decrypt the user data from the token
      let decodedUser = jwtDecode(token)
      //if the token is not valid or the expiration date has passed, user stays logged out
      if ( !decodedUser || Date.now() > decodedUser.exp * 1000 ) {
        console.log('Expired or bad token')
        setUser(null)
      }
      else {
        //the user is valid, token is good
        console.log('User and token are good')
        setUser(decodedUser)
      }
    }
    else {
      //no user logged in
      console.log('There was no token')
      setUser(null)
    }
  }

  
  const updateToken = (newToken) => {
    //Set the new token into localStorage
    localStorage.setItem('boilerToken' , newToken || '')

    //Update the state (basically the user info)
    decodeToken()

  }

  return (
    <Router>
      <div className="App">
        <Nav user={user} updateToken={updateToken}/>
        <Header />
        <main>
          <Content user={user} updateToken={updateToken} />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
