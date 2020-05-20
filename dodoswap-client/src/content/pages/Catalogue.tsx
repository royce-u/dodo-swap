//packages
import React, { FormEvent, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

//custom components
import Content from '../Content'
import { Decoded, User } from '../../App'

interface CatalogueProps {
    user: Decoded | null,
    updateToken: (newToken: string | null) => void
}

const Catalogue: React.FC<CatalogueProps> = props => {
    let [message, setMessage] = useState('')
    

    //update user token

    // useEffect()

    return (
        <h1>Catalogue Page</h1>
    )
}

export default Catalogue