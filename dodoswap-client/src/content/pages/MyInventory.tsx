//packages
import React, { FormEvent, useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Container, Grid, Icon } from 'semantic-ui-react'

import { Decoded } from '../../App'

interface MyInventoryProps {
    user?: Decoded | null
}

const MyInventory: React.FC<MyInventoryProps> = props => {
    let [myInv, setMyInv] = useState([])

    useEffect(() => {
        let token = localStorage.getItem('boilerToken')
        console.log('token--------->',token)
        fetch(process.env.REACT_APP_SERVER_URL + 'user/inventory', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                (response.json())
                    .then(data => {
                        setMyInv(data.items)
                        console.log('puhrawps------>', props.user)
                    })
                    .catch(innErr => {
                        console.log(innErr)
                    })
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    if (props.user) {
        let displayyy = myInv.slice(0, 10).map((m: any) => {
            return (
                <div key={m._id}>
                    <p>{m.name}</p>
                </div>
            )
        })
        return (
            <div>
                <h2>inventory stub</h2>
                <Grid>{displayyy}</Grid>
            </div>
        )
    }
    return (
        <div>
            <h1>No Token</h1>
        </div>
    )
}

export default MyInventory 