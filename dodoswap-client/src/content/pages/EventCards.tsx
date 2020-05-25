import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Grid, Icon, Image } from 'semantic-ui-react'

//custom components
import { Decoded } from '../../App'
import {EventInterface} from './Events'

interface CalendarProps {
    user: Decoded | null
    calendarEvents: EventInterface[]
}

const EventCards: React.FC<CalendarProps> = props => {


    let calendarInput = props.calendarEvents.map((c:any) =>{ 
            
        return(
           
    <Card>
      <Card.Content>
        <Card.Header>{c.date} -Catalogue Party</Card.Header>
        <Card.Meta>Max Visitors: {c.maxVisitor}</Card.Meta>
        <Card.Description>
          {c.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='blue'>
            More details…
          </Button>
        </div>
      </Card.Content>
    </Card>
        
        )
       })
    
    


    return (

        <Container>
        {calendarInput}
        </Container>

    )
}
export default EventCards;