//packages
import React, { useState, useEffect, FormEvent } from 'react'


import {Container} from 'semantic-ui-react'
import { Decoded } from '../../App'
import { useParams } from 'react-router-dom'

interface EventDetailsProps {
    user?: Decoded | null

    // params: string
    // {match}: RouteComponentProps<RouteInfo>
    // id: string
}

// interface EventDeets {
//     date: string
//     description: string
// }

const EventDetails: React.FC<EventDetailsProps> = props => {

    const [eventDetails, setEventDetails] = useState({
        date: String,
        time: String,
        private: Boolean,
        description: String,
        maxVisitor: Number,
        hostId: String,
        _id: String
    })
    const [hostInfo, setHostInfo] = useState({
        islandName: String,
        nativeFruit: String,
        userName: String,
        firstName: String,
        lastName: String,
        pic: String
    })

    //Button to join event (if not the host)
    const handleJoin = ((e:FormEvent) => {
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'event', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer${token}`
            }
        })
        // .then(response => {
        //     response.json()
        // })
        // .catch(err => {
            //     console.log(err)
            // })
            
        console.log('event successfully joined')
        return <Redirect to="/user" />
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
                        console.log(hostInfo.nativeFruit)

                    })
                    .catch(innErr => {
                        console.log(innErr)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    
    //null check so we can get props.user to work
    if (!props.user ) {
        return null
        // console.log(eventDetails.hostId)
    }

    console.log(hostInfo)
    // console.log(eventDetails.hostId.firstname)
    
    //if user is host - show detail && cancel event button
    //else if user is not host - display join button

    //else if maxvisitor == attendees.count show event details & "event closed"

    return (
        <Container>
            <h1>Event Details</h1>
            {/* <p><{eventDetails.hostId.firstName}</p> */}
            <p>{eventDetails.date}</p>
            <p>{eventDetails.time}</p>
            <p>Max Visitors: {hostInfo.firstName}</p>
            {/* <p>{eventDetails.attendees}</p> */}
            <p>{eventDetails.description}</p>
            <Button onClick={handleJoin}value={props.user._id}>Join</Button>

        </Container>
    )

}

export default EventDetails