//packages
import React, { FormEvent, useState, useEffect } from 'react'


//custom components
import { Decoded } from '../../App'

interface CatalogueProps {
    user: Decoded | null,
    updateToken: (newToken: string | null) => void
}

const Catalogue: React.FC<CatalogueProps> = props => {

    useEffect(() => {
        console.log('made it to cat')
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'catalogue/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                response.json()
                    .then(response => {
                        if (response) {
                            console.log(response)
                        }
                    })
            })

            .catch(err => {
                console.log('error with fetch call: ', err)
            })
    })
    console.log(props.user)
    //Make sure there is a user before trying to show their info
    // if (!props.user) {
    //     return <Redirect to="/auth/login" />
    //   }


    if (props.user) {
        return (
            <div>
                <h1>Catalogue Page</h1>
            </div>
        )
    }
    return (
        <div>
            <h1>Catalogue Page</h1>
        </div>
    )

}

export default Catalogue