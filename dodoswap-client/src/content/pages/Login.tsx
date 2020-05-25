// Packages
import React, { FormEvent, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Decoded } from '../../App'
import { Button, Form, Input, Menu } from 'semantic-ui-react'


interface LoginProps {
  user: Decoded | null,
  updateToken: (newToken: string | null) => void
}

const Login: React.FC<LoginProps> = props => {
  // Declare and initialize state variables
  let [email, setEmail] = React.useState<String>('')
  let [message, setMessage] = React.useState<String>('')
  let [password, setPassword] = React.useState<String>('')

  useEffect(() => {
    setMessage('')
  }, [email, password])


  // Event handlers
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    //Send the user sign up data to the server
    console.log('submit', email, password)

    // Fetch call to POST data
    fetch(process.env.REACT_APP_SERVER_URL + 'auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('RESPONSE', response)
        //Handle non-200 responses
        if (!response.ok) {
          setMessage(`${response.status}: ${response.statusText}`)
          return
        }
        //we got a good (200) response, we get the token
        response.json()
          .then(result => {
            //Giving the token back up to 
            props.updateToken(result.token)
          })
      })
      .catch(err => {
        console.log('ERROR SUBMITTING: ', err)
      })
  }

  //Check if there is a user and redirect them to their profile
  if (props.user) {
      return <Redirect to="/user" />
  }

  return (
    <Menu.Menu position='right'>
      <Form size={"tiny"} onSubmit={handleSubmit}>
        <Form.Group className="login-fields">
        <Menu.Item>
          <Input label="Email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
        </Menu.Item>
        <Menu.Item>
          <Input label="Password" type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
        </Menu.Item>
        <Menu.Item>
        <Button color="blue" size={"tiny"} content="Login" icon="sign-in" labelPosition="right" type="submit"/>
        </Menu.Item>
        </Form.Group>
      </Form>
    </Menu.Menu>
  )
}

export default Login
