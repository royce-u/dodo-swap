//packages
import React, { FormEvent, useState } from 'react'
import { Button, Container, Form } from 'semantic-ui-react'
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
//custom components
import { Decoded } from '../../App'
import { Redirect } from 'react-router-dom';
import moment from 'moment'

interface NewEventProps {
    user: Decoded | null,
    updateToken: (newToken: string | null) => void
    
}

const AddEvent: React.FC<NewEventProps> = props => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [maxVisitor, setMaxVisitor] = useState(1)
    const [hostDescription, sethostDescription] = useState('')
    const [redirect, setRedirect] = useState(false)


    const handleChangeDate = (e:FormEvent,{goat, value}:any) => {
            //convert input date to satisfy the requirements of full-calendar-react
            //split string by "-"
            let result = value.split('-')
            //reorder and added "-"
            let result2 = ([result[2], result[0], result[1]]).join('-')
            //set date
            setDate(result2)

    }
    const handleChangeTime = (e:any,{name, value}:any) => {
        setTime(value)
        // setEventInfo({
        //     date: value,
        //     time: name
        // })
        // console.log(eventInfo)
        console.log(time)

    }

    const handleSubmit = ((e:FormEvent) => {
        e.preventDefault()
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'event', {
            method: 'POST',
            body: JSON.stringify({
                date: date,
                time: time,
                maxVisitor: maxVisitor,
                description: hostDescription, 
                hostId: idee

            }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            
        })
        setRedirect(true)
        
    })

    if (!props.user){
        //return loading spinner
        return null
    }
    console.log(date)
    let idee = props.user._id ? props.user._id: undefined
   
    return (
        <Container>
            <h1>Add an Event</h1>
            <Form onSubmit={(e) =>handleSubmit(e)}>
                <Form.Group>
                    <Form.Field>
                        <label>Date:</label>
                        <DateInput value={date} onChange={handleChangeDate} goat="date" />
                    </Form.Field>
                    <Form.Field>
                        <label>Time:</label>
                        <TimeInput value={time} onChange={handleChangeTime} name="time" />
                    </Form.Field>
                    <Form.Field onChange={(e:any) => setMaxVisitor(e.target.value)}label='Max Visitors' control='select' name="maxVisitor">
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                    </Form.Field>
                </Form.Group>
                <Form.Field onChange={(e:any) => sethostDescription(e.target.value)}value={hostDescription} label='Description' control='textarea' rows='3' name="comments" />
                <input type="hidden" value={idee} name="hostId" />
                <Button type="submit" color="blue" >Create Event</Button>

            </Form>
            {redirect&&<Redirect to="/event" />}
        </Container>
    )
}

export default AddEvent

// {/* <button class="ui toggle button" aria-pressed="false">Toggle</button> */}