//packages
import React, { useState, useEffect } from 'react'
import { Container, Grid, Image } from 'semantic-ui-react'

import { Decoded } from '../../App'

interface MyInventoryProps {
    user?: Decoded | null

}

const MyInventory: React.FC<MyInventoryProps> = props => {
    let [myInv, setMyInv] = useState([])

    useEffect(() => {
        let token = localStorage.getItem('boilerToken')
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
                        setMyInv(data.user.inventory)
                    })
                    .catch(innErr => {
                        console.log(innErr)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    let display = myInv.map((m: any) => {
        return (
            <div key={m._id}>
                <Image className="tiny" src={m.image} alt={m.name} />
                <p>{m.name}</p>
            </div>
        )
    })
    return (
        <Container>
            <Grid columns={3} divided>
                <Grid.Row>
                    <Grid.Column>{display}</Grid.Column>
                </Grid.Row>

            </Grid>
        </Container>

    )

}

export default MyInventory 