//packages
import React, { FormEvent, useState, useEffect } from 'react'

//custom components
import { Decoded } from '../../App'

interface NewEventProps {
    user: Decoded | null,
    updateToken: (newToken: string | null) => void
}

const AddEvent: React.FC<NewEventProps> = props => {
    return (
        <div>
            <h1>Add Events FROM</h1>
        </div>
    )
}

export default AddEvent