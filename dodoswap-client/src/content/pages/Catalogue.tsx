//packages
import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { Button, Container, Grid, Icon, Image, Card } from 'semantic-ui-react'



//custom components
import { Decoded } from '../../App'

interface CatalogueProps {
    user: Decoded | null

}

const Catalogue: React.FC<CatalogueProps> = props => {
    let [catItems, setCatItems] = useState([])
    let [fetchUser, setFetchUser] = React.useState<String | null>('')
    // let [fetchWish, setFetchWish] = React.useState<String>('')
    // let [inventory, setInventory] = React.useState<String>('')


    const handleWishList = ((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let token = localStorage.getItem('boilerToken')
        console.log('added to faves')
        if (props.user) {
            setFetchUser(props.user._id)
            fetchUser = props.user._id
        }
        let data = {
            wishList: e.currentTarget.value,
            chicken: fetchUser
        }
        fetch(process.env.REACT_APP_SERVER_URL + 'user/wishlist', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        console.log('item# from button after fetchcall:', e.currentTarget.value)
    })

    const handleInventory = ((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let token = localStorage.getItem('boilerToken')
        if (props.user) {
            setFetchUser(props.user._id)
            fetchUser = props.user._id
        }
        let data = {
            inventory: e.currentTarget.value,
            chicken: fetchUser
        }
        fetch(process.env.REACT_APP_SERVER_URL + 'user/inventory', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
    })


    useEffect(() => {
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'catalogue/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                response.json()
                    .then(data => {
                        console.log('data: ', data)
                        if (data) {
                            setCatItems(data.items)
                        }
                    })
                    .catch(innErr => {
                        console.log('inner catch: ', innErr)
                    })
            })
            .catch(err => {
                console.log('error with fetch call: ', err)
            })
    }, [])

    if (props.user) {
        let display = catItems.slice(0,20).map((c: any) => {
            return (
                <Grid.Column>
                    <Grid.Row>
                        <Image src={`${c.image}`} alt={`{${c.name}}`} id="catPic" />
                    </Grid.Row>
                    <Grid.Row>
                        <Link to={`/catalogue/${c._id}`}>{c.name}</Link>
                    </Grid.Row>
                    <Grid.Row>
                        <Button.Group>
                            <Button icon onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleWishList(e)} value={c._id}>
                                <Icon name='heart' />
                            </Button>
                            <Button icon onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleInventory(e)} value={c._id}>
                                <Icon name='plus square outline' />
                            </Button>
                        </Button.Group>
                    </Grid.Row>
                </Grid.Column>


            )
        })
        return (
            <Container>
                <h1>Catalogue Page</h1>
                <Grid>
                    <Grid.Row columns={5}>
                        {display}
                    </Grid.Row>
                </Grid>

            </Container>
        )
    }
    return (
        <div>
            <h1>No Token - GO HOME!</h1>

        </div>
    )
}

export default Catalogue

