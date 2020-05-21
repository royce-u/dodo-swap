// Packages
import React, { FormEvent, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Container, Form, Grid, Image, Input } from 'semantic-ui-react'
import App, { Decoded } from '../../App'

interface SignupProps {
  user: Decoded | null,
  updateToken: (newToken: string | null) => void
}

const Signup: React.FC<SignupProps> = props => {
  // Declare and initialize state variables
  let [email, setEmail] = React.useState<String>('')
  let [firstname, setFirstname] = React.useState<String>('')
  let [lastname, setLastname] = React.useState<String>('')
  let [message, setMessage] = React.useState<String>('')
  let [password, setPassword] = React.useState<String>('')


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    //Send the user sign up data to the server
    console.log('submit', email, password)
    // Fetch call to POST data
    fetch(process.env.REACT_APP_SERVER_URL + 'auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        firstname,
        lastname,
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
            console.log("RESULT", result)
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

    <Container className="center-form">
      <Grid columns={2} verticalAlign="middle">
        <Grid.Row>
          <Grid.Column >
            <Image src="https://external-preview.redd.it/aRKmD70kt1OTGE5q1wAUfxNXNJdo2PUzuccIkRagnEg.png?width=960&crop=smart&auto=webp&s=c19c2fed2c6488291ec8ae179bbd3ef3d6650eb6" />
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={6}>
            <Form onSubmit={handleSubmit} className="signup">
              <span className="red">{message}</span>
              <Form.Group>
                <Form.Field>
                  <label>First Name</label>
                <Input name="firstname" placeholder="Your first name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstname(e.target.value)} />
                </Form.Field>
                <Form.Field>
                <label>Last Name</label>
                <Input name="lastname" placeholder="Your last name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastname(e.target.value)} />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <label>Email</label>
                <Input type="email" name="email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                <Input type="password" name="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                </Form.Field>
              </Form.Group>
              <Button type="submit">Sign Me Up!</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>

  )
}

export default Signup
