//packages
import React, { useState, useEffect } from 'react'
import { Container, Grid, Header, Image, Table } from 'semantic-ui-react'

import { Decoded } from '../../App'

interface MyWishListProps {
    user?: Decoded | null
}


const MyWishList:React.FC<MyWishListProps> = props => {
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
    },[])

    let display = myWishList.map((w:any) => {
        return(
            <Grid.Column>
                <Grid.Row key={w._id} columns={2} divided>
                <Grid.Column width={2}>
                    <Image className="tiny" src={w.image} alt={w.name} />
                </Grid.Column>
                <Grid.Column width={2}>
                    <p>{w.name}</p>
                    <p>{w.variation}</p>
                </Grid.Column>
            </Grid.Row>
            </Grid.Column>
        )
    })
    
    return(
        <Container>
            <Grid columns={2} divided>
              <Grid.Row> 
                {display}
              </Grid.Row>
                 
            </Grid>
        </Container>
    )
}

export default MyWishList