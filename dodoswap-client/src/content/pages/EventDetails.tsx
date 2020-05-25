//packages
import React, { useState, useEffect } from 'react'


import { Decoded } from '../../App'

interface EventDetailsProps {
    user?: Decoded | null

}

const EventDetails: React.FC<EventDetailsProps> = props => {
    return (
        <h1>Event Details</h1>
    )
}

export default EventDetails