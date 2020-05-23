//packages
import React, { FormEvent, useState, useEffect } from 'react'
import { Button, Container, Form } from 'semantic-ui-react'
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
//custom components
import { Decoded } from '../../App'

interface NewEventProps {
    user: Decoded | null,
    updateToken: (newToken: string | null) => void
}

const AddEvent: React.FC<NewEventProps> = props => {
    const handleChange = () => {
        console.log('boop')
    }

    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Field>
                        <label>Date:</label>
                        <DateInput value={''} onChange={handleChange} name="date" />
                    </Form.Field>
                    <Form.Field>
                        <label>Time:</label>
                        <TimeInput value={''} onChange={handleChange} name="time" />
                    </Form.Field>
                    <Form.Field label='Max Visitors' control='select' name="maxVisitor">
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                    </Form.Field>
                </Form.Group>
                <Form.Field label='Description' control='textarea' rows='3' name="description" />
                <input type="hidden" value={''} name="hostId" />
                <Button type="submit">Create Event</Button>
            </Form>
        </Container>
    )
}

export default AddEvent