import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Decoded } from '../../App'
import { Container, Grid, Header, Image, Tab, Table } from 'semantic-ui-react'
import ProfileModal from './ProfileModal'

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

  var picDisplay = (
    <Image src="https://vignette.wikia.nocookie.net/animalcrossing/images/2/2a/Airlines-char-1-2x.png/revision/latest?cb=20200221010843" alt="wilbur-dodo" size="small" />
  )
  if (props.user.pic) {
    picDisplay = (
      <Image src={props.user.pic} alt={props.user.firstname} size="small" />
    )
  }
  let fruit = props.user.nativeFruit ? props.user.nativeFruit : undefined

  if (fruit === 'pear') {
    var fruitDisplay = (
      <Image src='https://66.media.tumblr.com/2d80816aec1c10b13ca8da6e5ed132ef/2e3386324f689302-b3/s1280x1920/6fad47de9158a3a86bdbd7e7d90814ff4423230c.png' rounded size='mini' />
    )
  }

  fruitDisplay = (
    <Image src='https://vignette.wikia.nocookie.net/animalcrossing/images/3/39/Breezy-hollow_icon.png/revision/latest?cb=20171111014116' rounded size='mini' />
  )

  return (
    <Container>
      <h1>PASSPORT</h1>
      <Grid>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={4}>
          {picDisplay}
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
                  <Image src='https://i.redd.it/vhmrq487mgn41.jpg' rounded size='mini' />
                  <Header.Content>
                    Island Name
                <Header.Subheader>{props.user.islandName}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Header as='h4' image>
                  {fruitDisplay}
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
                      <ProfileModal user={props.user} />
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
