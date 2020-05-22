//packages
import React, { FormEvent, useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Container, Grid, Icon } from 'semantic-ui-react'

import { Decoded } from '../../App'

interface MyWishListProps {
    user?: Decoded | null
}


const MyWishList:React.FC<MyWishListProps> = props => {
    let [myWishList, setMyWishList] = React.useState([])

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
                setMyWishList(data.items)
            })
            .catch(innErr => {
                console.log(innErr)
            })
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    
    return(
        <div>
            <h1>My Wishlist</h1>
        </div>
    )
}

export default MyWishList