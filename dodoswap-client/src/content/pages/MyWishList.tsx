//packages
import React, { FormEvent, useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Container, Grid, Icon, Image } from 'semantic-ui-react'

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
            <div key={w._id}>
                <Image className="tiny" src={w.image} alt={w.name} />
                <p>{w.name}</p>
            </div>
        )
    })
    
    return(
        <Container>
            <Grid.Row>
                <Grid.Column>{display}</Grid.Column>
            </Grid.Row>
        </Container>
    )
}

export default MyWishList