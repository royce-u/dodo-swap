//packages
import React, { useState, useEffect } from 'react'
import {Button, Container, Message} from 'semantic-ui-react'
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
    let [spotsLeft, setSpotsLeft] = useState<number>(0)
    //actual event details
    const [eventDetails, setEventDetails] = useState({
        date: String,
        time: String,
        private: Boolean,
        islandName: String,
        description: String,
        maxVisitor: Number,
        // attendees: {
        //     []
        // }
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
        if(props.user){
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
            .then( (response: Response) => {
                response.json()
                .then( result => {
                    if (response.ok) {
                        props.updateToken( result.token )
                        setReferRedirect(true)
                        setSpotsLeft(spotsLeft-1)
                    } else {
                        setMessage(`${response.status} ${response.statusText}: ${result.message}`)
                    }
                })
            })
            .catch( (err: Error) => {
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
                        console.log("THIS EVENT HERE", data.event)
                    })
                    .catch(innErr => {
                        console.log(innErr)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }, [spotsLeft])

    if (referRedirect) {
        return(
            <Redirect to = "/user" />
        )
    }
    //null check so we can get props.user to work
    if (!props.user ) {
        return null
        // console.log(eventDetails.hostId)
    }
    // console.log('props.user', props.user._id)
    console.log(eventDetails)
    // console.log(eventDetails.hostId.firstname)
    
    //if user is host - show detail && cancel event button
    //else if user is not host - display join button

    //else if maxvisitor == attendees.count show event details & "event closed"

    return (
        <Container>
            <h1>Event Details</h1>
            {/* <p><{eventDetails.hostId.firstName}</p> */}
            <Message color='teal' attached header="Community Guidelines" />
            <Message >
            <Message.Header>Date: {eventDetails.date}</Message.Header>
            <p>{eventDetails.time}</p>
            <p>Max Visitors: {eventDetails.maxVisitor}</p>
            <p>Spots Left: {spotsLeft}</p>
            <p>Hosted by: {hostInfo.userName}</p>
            <p>Island: {hostInfo.islandName}</p>
            <p>{eventDetails.description}</p>
            <Button onClick={handleJoin} color="blue">Join</Button>
            </Message>
        </Container>
    )

}

export default EventDetails