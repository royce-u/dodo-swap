// Packages
import React, { FormEvent, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Container, Form, Grid, Input } from 'semantic-ui-react'
import  { Decoded }   from '../../App'
import { ReactComponent as Logo } from '../../css/assets/logo-square.svg'

interface SignupProps {
  user: Decoded | null,
  updateToken: (newToken: string | null) => void
}

const Signup: React.FC<SignupProps> = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState<String>('')
  let [firstname, setFirstname] = useState<String>('')
  let [lastname, setLastname] = useState<String>('')
  let [message, setMessage] = useState<String>('')
  let [password, setPassword] = useState<String>('')

  
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
          .catch(err => {
            console.log('ERROR in result: ', err)
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
            <Logo />
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={6}>
            <h3>Sign up to find fun and respectful members in our community to have catalogue parties with!</h3>
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
                <Input type="email" placeholder="Your email"name="email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                <Input type="password" placeholder="Minimum- 8 characters"name="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
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
