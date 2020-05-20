// Import packages
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
// import { ReactDom } from 'react-dom'

// Resources and custom components
import './App.css';
import Content from './content/Content'
// import Footer from './nav/Footer'
import Header from './nav/Header'
import Nav from './nav/Nav'

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  userName: string;
  islandName: string;
  nativeFruit: string;
  pic: string;
  ratings: [];
  inventory: [];
  wishList: [];
  friends: [];
  events: [];
  validPassword(user:User, password: string): boolean
}


//Interface for decoded type
export interface Decoded extends User {
  exp: number
}

const App: React.FC = () => {
  // Declare state variables (where the token lives)
  let [user, setUser] = useState<Decoded | null>(null)

  //useEffect hook (on load) - 
  useEffect(() => {
    decodeToken(null)
  }, []) //Empty array, meaning only run this on page load

  //Function to update user token
  const updateToken = (newToken: string | null) => {
    if (newToken){
      //Set the new token into localStorage
      localStorage.setItem('boilerToken' , newToken || '')
      //Update the state (basically the user info)
      decodeToken(newToken)
    }
    else {
      //if no token - user is null
      setUser(null)
    }
  }

  //Function to decode token
  const decodeToken = (existingToken: string | null) => {
    let token: string | null = existingToken || localStorage.getItem('boilerToken')

    //if token exists
    if (token) {
      //decrypt the user data from the token
      let decodedUser: any = jwtDecode(token)
      //if the token is not valid or the expiration date has passed, user stays logged out
      if ( !decodedUser || (Date.now() > decodedUser.exp * 1000)) {
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

  return (
    <Router>
      <div className="App">
        <Nav user={user} updateToken={updateToken}/>
        <Header />
        <main>
          <Content user={user} updateToken={updateToken} />
        </main>
        {/* <Footer /> */}
      </div>

    </Router>
  )
}

export default App
