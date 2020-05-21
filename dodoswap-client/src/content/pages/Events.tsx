//packages
import React, { FormEvent, useState, useEffect } from 'react'

//custom components
import { Decoded } from '../../App'

interface EventProps {
    user: Decoded | null,
    updateToken: (newToken: string | null) => void
}

const Event: React.FC<EventProps> = props => {
    return (
        <div>
            <h1>Events Page STUB</h1>
        </div>
    )
}

export default Event