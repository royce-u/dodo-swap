//packages
import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, Icon, Image } from 'semantic-ui-react'

//custom components
import { Decoded } from '../../App'


interface EventProps {
    user: Decoded | null
}

const Event:React.FC<EventProps> = props => {
    let [events, setEvents] = useState([])

    useEffect(() => {
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'event', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            response.json()
            .then(data => {
                setEvents(data.events)
                
                console.log(typeof(data.events))
                // console.log('events---->',events)
                console.log('data---->', data)
            })
            .catch(innErr => {
                console.log(innErr)
            })
        })
        .catch(err => {
            console.log(err)
        })

    },[])
    console.log('events---->',events)

    if (!props.user){
        return null
    }

    let display = events.map((e:any) => {
        return (
            <div key={e._id}>
                <p>{e.date}</p>
                <p>{e.time}</p>
                <p>{e.maxVisitor}</p>
            </div>
        )
    })

    return (
        <div>
            <Container>
            <h1>Events Page STUB</h1>
                <Grid.Column>{display}</Grid.Column>
            </Container>
        </div>
    )
}
    export default Event