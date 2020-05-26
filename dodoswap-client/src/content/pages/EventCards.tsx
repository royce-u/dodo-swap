import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Container } from 'semantic-ui-react'

//custom components
import { Decoded } from '../../App'
import { EventInterface } from './Events'

interface CalendarProps {
  user: Decoded | null
  calendarEvents: EventInterface[]
}

const EventCards: React.FC<CalendarProps> = props => {
  console.log("CALENDAR EVENTS", props.calendarEvents)

  let calendarInput = props.calendarEvents.map((c: any) => {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{c.date} -Catalogue Party</Card.Header>
          <Card.Meta>Max Visitors: {c.maxVisitor}</Card.Meta>
          <Card.Description>
            {c.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic color='blue' as={Link} to={`/event/${c._id}`}>
            More details…
          </Button>
        </Card.Content>
      </Card>
    )
  })
  
  return (

    <Container>
      <Card.Group itemsPerRow={4}>
        {calendarInput}
      </Card.Group>
    </Container>

  )
}
export default EventCards;