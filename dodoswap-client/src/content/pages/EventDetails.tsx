//packages
import React, { useState, useEffect } from 'react'


import {Container} from 'semantic-ui-react'
import { Decoded, RouteInfo } from '../../App'
import { RouteComponentProps, useParams } from 'react-router-dom'

interface EventDetailsProps {
    user?: Decoded | null
    
    // params: string
    // {match}: RouteComponentProps<RouteInfo>
    // id: string
}

interface EventDeets {
    date: string
    description: string
}

const EventDetails: React.FC<EventDetailsProps> = props => {
    
    const [eventDetails, setEventDetails] = useState({
        date: String,
        time: String,
        private: Boolean,
        description: String,
        maxVisitor: Number,
        _id: String

    })
    //new feature in react router 5.1 - instead of match props
    let{id} = useParams()
    useEffect(() => {
        let token = localStorage.getItem('boilerToken')
        //fetch call to grab selected event
        fetch(process.env.REACT_APP_SERVER_URL + 'event/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization':  `Bearer ${token}`
            }
        })
        .then(response => {
            response.json()
            .then(data => {
                setEventDetails(data.event)
                console.log(data.event.date)
                
            })
            .catch(innErr => {
                console.log(innErr)
            })
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    console.log(eventDetails)
    // console.log('event deets type--->',typeof(eventDetails))
    // console.log(Array.isArray(eventDetails))


    return (
        <Container>
            <h1>Event Details</h1>
            <p>{eventDetails.date}</p>

        </Container>
        

    )
}

export default EventDetails