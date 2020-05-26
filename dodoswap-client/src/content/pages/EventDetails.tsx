//packages
import React, { useState, useEffect } from 'react'
import { Button, Container, Grid, Image, Message } from 'semantic-ui-react'
import { Decoded } from '../../App'
import { Redirect, useParams } from 'react-router-dom'


interface EventDetailsProps {
    user?: Decoded | null
    updateToken: (newToken: string | null) => void
}


const EventDetails: React.FC<EventDetailsProps> = props => {
    let [message, setMessage] = useState('')
    let [fetchUser, setFetchUser] = useState<String | null>('')
    let [referRedirect, setReferRedirect] = useState(false)
    //actual event details
    const [eventDetails, setEventDetails] = useState({
        date: String,
        time: String,
        private: Boolean,
        islandName: String,
        description: String,
        maxVisitor: Number,
        attendees: [{}],
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
    //attendee info 
    const [attendeeInfo, setAttendeeInfo] = useState([])

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
                        setAttendeeInfo(data.event.attendees)
                    })
                    .catch(innErr => {
                        console.log(innErr)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    if (referRedirect) {
        return (
            <Redirect to="/user" />
        )
    }
    //null check so we can get props.user to work
    if (!props.user) {
        return null
    }
    // console.log('props.user', props.user._id)
    console.log("ATTENDEE INFO", attendeeInfo)
 
    
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
                        <p>{eventDetails.time}</p>
                        <p>Max Visitors: {eventDetails.maxVisitor}</p>
                        <p>Hosted by: {hostInfo.userName}</p>
                        <p>Island: {hostInfo.islandName}</p>
                        <p>{eventDetails.description}</p>
                        <Button onClick={handleJoin} color="blue">Join</Button>
                    </Message>
                    </Grid.Column>
                </Grid.Row>               
            </Grid>
        </Container>
    )
}

export default EventDetails