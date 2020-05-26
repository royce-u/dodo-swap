//packages
import React, { useState, useEffect } from 'react'
import { Container, Grid, Image } from 'semantic-ui-react'

import { Decoded } from '../../App'

interface MyWishListProps {
    user?: Decoded | null
}


const MyWishList: React.FC<MyWishListProps> = props => {
    let [myWishList, setMyWishList] = useState([])

    useEffect(() => {
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'user/wishlist', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                (response.json())
                    .then(data => {
                        setMyWishList(data.user.wishList)
                    })
                    .catch(innErr => {
                        console.log(innErr)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    console.log(myWishList)

    let display = myWishList.map((w: any) => {
        return (
            <Grid.Column key={w._id} >
                <Image size="tiny" src={w.image} alt={w.name} />
                <p>{w.name}</p>
                <p>{w.variation}</p>
            </Grid.Column>

        )
    })

    return (
        <Container>
            <Grid columns={6}>
            <Grid.Row>
                {display}
            </Grid.Row>  
            </Grid>
        </Container >
    )
}

export default MyWishList