import React, { FormEvent, useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Decoded } from '../../App'
import { Button, Container, Form, Grid, Header, Icon, Image, Input, Modal, Tab, Table } from 'semantic-ui-react'
import ProfileModal from './ProfileModal'

//props
interface ProfileProps {
  user: Decoded | null,
  updateToken: (newToken: string | null) => void
}

const Profile: React.FC<ProfileProps> = props => {
  let [secretMessage, setSecretMessage] = useState('')
  let [email, setEmail] = React.useState<String>('')
  let [firstname, setFirstname] = React.useState<String>('')
  let [lastname, setLastname] = React.useState<String>('')
  let [acName, setAcname] = React.useState<String>('')
  let [islandName, setIslandName] = React.useState<String>('')
  let [nativeFruit, setNativeFruit] = React.useState<String>('')
  let [pic, setPic] = React.useState<String>('')

  

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
  console.log("PROPS USER", props.user)

  

  //User profile panes
  const panes = [
    { menuItem: 'My Events', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    { menuItem: 'My Wishlist', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'My Inventory', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ]


  //Make sure there is a user before trying to show their info
  if (!props.user) {
    return <Redirect to="/" />
  }

  return (
    <Container>
      <h1>PASSPORT</h1>
      <Grid>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={4}>
          <Image src={props.user.pic} alt={props.user.firstname} />
        </Grid.Column>
        <Grid.Column width={9}>
          <Table>
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src='https://files.meiker.io/assets/7928/2020/04/icon_202004011946325e84ef9861acd.png' rounded size='mini' />
                  <Header.Content>
                    Name
                <Header.Subheader>{props.user.firstname} {props.user.lastname}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src='https://www.pngitem.com/pimgs/m/148-1484120_animal-crossing-new-leaf-icon-hd-png-download.png' rounded size='mini' />
                  <Header.Content>
                    AC User Name
                <Header.Subheader>{props.user.userName}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src='https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2020/03/acnh-travel-guide-app-icon.png?itok=gCkAlTuE' rounded size='mini' />
                  <Header.Content>
                    Island Name
                <Header.Subheader>{props.user.islandName}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src='https://vignette.wikia.nocookie.net/animalcrossing/images/3/39/Breezy-hollow_icon.png/revision/latest?cb=20171111014116' rounded size='mini' />
                  <Header.Content>
                    Native Fruit
                <Header.Subheader>{props.user.nativeFruit}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src='https://cdn0.iconfinder.com/data/icons/super-mono-reflection/blue/mail_blue.png' rounded size='mini' />
                  <Header.Content>
                    Email
                <Header.Subheader>{props.user.email}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell textAlign='right'>
                <Header>
                  <Header.Content>
                    <Header.Subheader >
                      <ProfileModal />
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
            </Table.Row>
          </Table>
        </Grid.Column>
      </Grid>
      <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
    </Container >
  )
}

export default Profile
