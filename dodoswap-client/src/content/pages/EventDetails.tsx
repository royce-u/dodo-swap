//packages
import React, { useState, useEffect } from 'react'
import { Button, Container, Grid, Header, Icon, Message, Table } from 'semantic-ui-react'
import moment from 'moment'
import { Decoded } from '../../App'
import { Redirect, useParams } from 'react-router-dom'

interface EventDetailsProps {
    user?: Decoded | null
    updateToken: (newToken: string | null) => void
}

const EventDetails: React.FC<EventDetailsProps> = props => {
    let [maxAttendeesReached, setMaxAttendeesReached] = useState(false)
    let [attendeeList, setAttendeeList] = useState([])
    let [message, setMessage] = useState('')
    let [fetchUser, setFetchUser] = useState<String | null>('')
    let [referRedirect, setReferRedirect] = useState(false)
    let [hostIdNumber, setHostIdNumber] = useState<String | null>('')
    //actual event details
    const [eventDetails, setEventDetails] = useState({
        date: String,
        time: String,
        private: Boolean,
        islandName: String,
        description: String,
        maxVisitor: Number,
        attendees: Array,
        hostId: String,
        _id: String
    })
    //host user details
    const [hostInfo, setHostInfo] = useState({
        islandName: String,
        nativeFruit: String,
        userName: String,
        firstName: String,
        lastName: String,
        pic: String

    })

    //Button to join event (if not the host)
    const handleJoin = ((e: React.MouseEvent<HTMLButtonElement>) => {
        let token = localStorage.getItem('boilerToken')
        if (props.user) {
            setFetchUser(props.user._id)
            fetchUser = props.user._id

            fetch(process.env.REACT_APP_SERVER_URL + 'event', {
                method: 'PUT',
                body: JSON.stringify({
                    id: eventDetails._id,
                    attendee: {
                        attendeeId: fetchUser
                    }
                }),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response: Response) => {
                    response.json()
                        .then(result => {
                            if (response.ok) {
                                props.updateToken(result.token)
                                setReferRedirect(true)
                            } else {
                                setMessage(`${response.status} ${response.statusText}: ${result.message}`)
                            }
                        })
                })
                .catch((err: Error) => {
                    console.log(err)
                    setMessage(`${err.toString()}`)
                })
        }
    })

    //new feature in react router 5.1 - instead of match props
    let { id } = useParams()
    useEffect(() => {
        let token = localStorage.getItem('boilerToken')
        //fetch call to grab selected event
        fetch(process.env.REACT_APP_SERVER_URL + 'event/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                response.json()
                    .then(data => {
                        setEventDetails(data.event)
                        setHostInfo(data.event.hostId)
                        setHostIdNumber(data.event.hostId._id)
                        setAttendeeList(data.event.attendees)

                        // setMaxAttendeesReached(data.event.attendees.length == event.maxvisitior ? true : false)
                        //data.length.attendees.length if true
                        //data.event.attendees.length
                        //set equal to state
                        console.log('data-------->', data)
                    })
                    .catch(innErr => {
                        console.log(innErr)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    console.log("ATTENDEE LIST", attendeeList)
    if (referRedirect) {
        return (
            <Redirect to="/user" />
        )
    }
    //null check so we can get props.user to work
    if (!props.user) {
        return null
    }

    //    if (props.user){

    //    }

    {/* if max number of attendees true dont show button */ }


    let attendeeDisplay = attendeeList.map((a: any) => {
        return (
            <li>{a.attendeeId.userName}</li>
        )
    })

    //Future features: 
    //if user is host - show detail && cancel event button
    //else if user is not host - display join button
    //else if maxvisitor == attendees.count show event details & "event closed"
    let list = ['Bring 5-10 items to share with others.',
        'DIY Crafted, Saharah and Mom Items cannot be catalogued.',
        `Keep track of the items you bring and DO NOT take other people's items.`,
        'Wait for the host to indicate where you should set up and when it is your turn to catalogue.',
        'Ask host before wandering away from cataloguing area or doing anything else, such as picking fruit or shopping.',
        'Have fun!']
    return (
        <Container>
            <h1>Event Details</h1>
            <Grid>
                <Grid.Row>
                </Grid.Row>
                <Grid.Row stretched>
                    <Grid.Column width={6}>
                        <Message color='teal' attached header="Community Guidelines" list={list} />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Message >
                            <Message.Header>Date: {eventDetails.date}</Message.Header>
                            <Table textAlign='center' >
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='clock outline' /><strong>Time</strong>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {eventDetails.time}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Icon name='male' /><strong>Max Visitors</strong>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {eventDetails.maxVisitor}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='user outline' /><strong>Host</strong>
                                        </Table.Cell>
                                        <Table.Cell>
                                        {hostInfo.userName}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Icon name='map outline' /><strong>Island</strong>
                                        </Table.Cell>
                                        <Table.Cell>
                                        {hostInfo.islandName}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell colSpan='4'>{eventDetails.description}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell colSpan='1'><Icon name='users' /><strong>Attendees</strong></Table.Cell>
                                        <Table.Cell colSpan='3'>{attendeeDisplay ? attendeeDisplay : <p>No one has signed up yet!</p>}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            {props.user._id == hostIdNumber ? <Button disabled color="blue">You are the host!</Button> : <Button onClick={handleJoin} color="blue">Join</Button>}
                        </Message>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default EventDetails