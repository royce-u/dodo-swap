//packages
import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, Icon, Image } from 'semantic-ui-react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'



//custom components
import { Decoded } from '../../App'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import interactionPlugin from '@fullcalendar/interaction';


interface EventProps {
    user: Decoded | null
    
}

const Event:React.FC<EventProps> = props => {
    let [events, setEvents] = useState([])
    

    
    return (
        <FullCalendar 
        defaultView="dayGridMonth" 
        plugins={[ dayGridPlugin, interactionPlugin ]}
        selectable={true}
        editable={false} 
        events={[
            {title: 'events 1', date: '2020-04-01', description: 'fuck you'}
        ]}
        />
        
    )
}
    export default Event