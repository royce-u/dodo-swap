import React, { useState, useEffect } from 'react'
import { Decoded } from '../../App'
import { Grid, Header, Image, Tab, Table } from 'semantic-ui-react'

import ProfileModal from './ProfileModal'


//props
interface ProfileBoxProps {
    user: Decoded | null,
    updateToken: (newToken: string | null) => void
}

const ProfileBox: React.FC<ProfileBoxProps> = props => {
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


    if (!props.user) {
        return null
    }

  var picDisplay = (
    <Image src="https://vignette.wikia.nocookie.net/animalcrossing/images/2/2a/Airlines-char-1-2x.png/revision/latest?cb=20200221010843" alt="wilbur-dodo" size="small" />
  )
  if (props.user.pic) {
    picDisplay = (
      <Image src={props.user.pic} alt={props.user.firstname} size="small" />
    )
  }

    return (
        <Grid>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={4}>
                <Image src={props.user.pic} rounded size='small' />
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
                                        <ProfileModal user={props.user} />
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                    </Table.Row>
                </Table>
            </Grid.Column>
        </Grid>
    )
}


export default ProfileBox