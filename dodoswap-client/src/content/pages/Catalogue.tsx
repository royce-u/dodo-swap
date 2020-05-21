//packages
import React, { FormEvent, useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Container, Grid, Icon } from 'semantic-ui-react'

//custom components
import Content from '../Content'
import { Decoded } from '../../App'

interface CatalogueProps {
    user: Decoded | null,
    // updateToken: (newToken: string | null) => void
}

const handleFave = (): void => {
    console.log('added to faves')
}

const Catalogue: React.FC<CatalogueProps> = props => {
    let [catItems, setCatItems] = useState([])
    
    useEffect(() => {
        console.log('made it to cat')
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'catalogue/', {
            headers: {
                'Authorization':  `Bearer ${token}`
            }
          })
          .then(response => {
              response.json()
              .then(data => {
                  console.log(data)
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
    console.log(props.user)
    console.log('outside useEffect', catItems)
    //Make sure there is a user before trying to show their info
    // if (!props.user) {
    //     return <Redirect to="/auth/login" />
    //   }

    
    if (props.user) {               
        let displayyy = catItems.slice(0,10).map((c: any) => {
            return (
                <Grid>
                    
                    <Grid.Column mobile={16} tablet={8} computer={4} key={c._id} >
                    
                
                    
                    <Link to={`/catalogue/${c._id}`}>{c.name}</Link>
                    
                    <Button.Group>
                    <Button icon> 
                        <Icon onClick={handleFave}name='heart outline' />
                    </Button>
                    <Button icon>
                        <Icon name='plus square outline' />
                    </Button>
                    </Button.Group>
                    
                </Grid.Column>
                
                </Grid>
            )
        })
        return (
            <Container>
            <h1>Catalogue Page</h1>
                {displayyy}
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

