//packages
import React, { FormEvent, useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Container, Grid, Icon } from 'semantic-ui-react'


//custom components
import Content from '../Content'
import { Decoded } from '../../App'

interface CatalogueProps {
    user: Decoded | null
}

const Catalogue: React.FC<CatalogueProps> = props => {
    let [catItems, setCatItems] = useState([])
    let [fetchUser, setFetchUser] = React.useState<String>('')
    let [fetchWish, setFetchWish] = React.useState<String>('')
    let [inventory, setInventory] = React.useState<String>('')

    
    const handleWishList = ((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let token = localStorage.getItem('boilerToken')
        
        console.log('added to faves') 
        if (props.user) {
            console.log('props.user: ', props.user._id)
            setFetchUser(props.user._id)
            fetchUser = props.user._id
        }
        console.log('---------',e.currentTarget.value)
        let data = {wishList: e.currentTarget.value,
            _id: fetchUser}
        fetch(process.env.REACT_APP_SERVER_URL + 'user/wishlist', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
                'Authorization':  `Bearer ${token}`
            }
        })
        // console.log('props.user: ', props.user)
        console.log('item# from button after fetchcall:', e.currentTarget.value)
        // setFetchWish(e.currentTarget.value)
        // console.log('wish after fetchcall: ',fuckYou)
        
        // const sendIt = async () => {
        //     e.preventDefault()
        //     let token = localStorage.getItem('boilerToken')
        //     if (props.user) {
        //         console.log(' inside sendIt ------props.user: ', props.user._id)
        //         setFetchUser(props.user._id)
        //         // fetchUser = props.user._id
        //     }
            
        //     await sendIt()
        //     fetch(process.env.REACT_APP_SERVER_URL + 'user', {
        //         method: 'PUT',
        //         body: JSON.stringify({
        //             wishList: e.currentTarget.value,
        //             _id: fetchUser
        //         }),
        //         headers: {
        //             'Authorization':  `Bearer ${token}`
        //         }
        //       })
        // }
        
        // fetch(process.env.REACT_APP_SERVER_URL + 'user', {
        //     method: 'PUT',
        //     body: JSON.stringify({
        //         wishList: e.currentTarget.value,
        //         _id: fetchUser
        //     }),
        //     headers: {
        //         'Authorization':  `Bearer ${token}`
        //     }
        //   })
    })
    
    const handleInventory = ((e: FormEvent) => {
        e.preventDefault()
        // setInventory(e.target.value)
        console.log('added to inventory')  
        console.log(inventory)      
    })
    const handleClick = () => {
        console.log('i clicked')
    }

    useEffect(() => {
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'catalogue/', {
            headers: {
                'Authorization':  `Bearer ${token}`
            }
          })
          .then(response => {
              response.json()
              .then(data => {
                  console.log('data: ',data)
                  if (data){
                      setCatItems(data.items)
                  }
              })
              .catch(innErr => {
                  console.log('inner catch: ',innErr)
              })
          })
          .catch(err => {
              console.log('error with fetch call: ', err)
          })
    },[])
    // console.log('outside useEffect', catItems)
    //Make sure there is a user before trying to show their info
    // if (!props.user) {
    //     return <Redirect to="/auth/login" />
    //   }

    if (props.user) {            
        let displayyy = catItems.slice(0,10).map((c: any) => {
            return (
                    <Grid.Column mobile={16} tablet={8} computer={4} key={c._id} className="center">
                    <img src={`${c.image}`} alt={`{${c.name}}`}/>
                    <Link to={`/catalogue/${c._id}`}>{c.name}</Link>
                    <Button.Group> 
                    <Button icon onClick={(e:React.MouseEvent<HTMLButtonElement>) => handleWishList(e)} value={c._id}> 
                        <Icon name='heart' />
                    </Button>
                 
                    <form onSubmit={handleInventory}>
                        <input type="hidden" name="inventory" value={c._id}/>
                    <Button icon type="submit">
                        <Icon name='plus square outline' />
                    </Button>
                    </form>
                    </Button.Group>
                </Grid.Column>              
            )
        })
        return (
            <Container>
            <h1>Catalogue Page</h1>
            <Grid>
                {displayyy}
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

