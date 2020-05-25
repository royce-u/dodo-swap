//packages
import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, Icon, Image } from 'semantic-ui-react'




//custom components
import { Decoded } from '../../App'
import EventCards from './EventCards'

interface EventProps {
    user: Decoded | null
}


export interface EventInterface {
    hostId: string;
    private: boolean;
    attendees: {
        attendeeId: string,
        top5: string[]
        toBring: string[]
    }[];
    date: string;
    time: string; 
    description: string;
    maxVisitor: number;
    dodoCode: string;
    comments: {
        author: string,
        date: Date,
        comment: string
    };
}

const Events:React.FC<EventProps> = props => {
    let [events, setEvents] = useState([])
    
    useEffect(() => {
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'event', {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization':  `Bearer ${token}`
            }
        })
        .then(response => {
            response.json()
            .then(data => {
                console.log(data)
                setEvents(data.events)
                console.log(typeof(data.events))
                
            })
            .catch(innErr => {
                console.log(innErr)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    
    return (
        <Container>
            <EventCards user={props.user} calendarEvents={events}/>
        </Container>
        
    )
}
    export default Events