//packages
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, List } from 'semantic-ui-react'


import { Decoded } from '../../App'

interface MyEventsProps {
    user?: Decoded | null
}

const MyEvents: React.FC<MyEventsProps> = props => {
    const [myEvents, setMyEvents] = useState([{
        date: String,
        time: String,
        private: Boolean,
        islandName: String,
        description: String,
        maxVisitor: Number,
        attendees: Array,
        hostId: String,
        _id: String
    }])

    //on load - GET MyEvents from user& set state
    useEffect(() => {
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'user/events', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                (response.json())
                    .then(data => {
                        setMyEvents(data.user.events)
                    })
                    .catch(innErr => {
                        console.log(innErr)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    // console.log(myEvents)

    let display = myEvents.map((m: any) => {
        return (

            <List.Item key={m._id}>
                <List.Icon name="calendar alternate" size="large" color="blue" verticalAlign="middle"/>
                <List.Content>
                <List.Header as={Link} to={`event/${m._id}`}>Date: {m.date} ({m.time})</List.Header>
                <List.Description>{m.description}</List.Description>
            Max Visitors: {m.maxVisitor}
            </List.Content>
            </List.Item>
        )
    })


    return (
        //return events
        <Container>
            <List divided relaxed>
                {display}
            </List>
        </Container>
    )
}

export default MyEvents