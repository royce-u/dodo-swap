import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import {Decoded} from '../../App'
import { Button, Container, Grid, Icon, Image } from 'semantic-ui-react'




interface CalendarProps {
    user: Decoded | null
    // hostId: string;
    // private: boolean;
    // attendees: {
    //     attendeeId: string,
    //     top5: string[],
    //     toBring: string[]
    // }[];
    // date: Date;
    // time: string; 
    // description: string;
    // maxVisitor: number;
    // dodoCode: string;
    // comments: {
    //     author: string,
    //     date: Date,
    //     comment: string
    // };
}

const EventCalendar:React.FC<CalendarProps> = props => {
    //modal for showing more details
    const [calEvents, setCalEvents] = useState([])

    //setup moment to localize the calendar
    const localizer = momentLocalizer(moment)

    useEffect(() => {
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'event/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            response.json()
            .then(data => {
                console.log(data.events)
                if (data){
                    setCalEvents(data.events)
                }
            })
            .catch(innErr => {
                console.log(innErr)
            })
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    console.log(calEvents)
    

    return(
        <div>
            <Container id="calendarId">
            <Calendar 
            localizer={localizer}
            events={calEvents}
            views={['month', 'week', 'day', 'agenda']}
            // startAccessor="start"
            // endAccessor="end"
            />
            </Container>
        </div>
    )
}

export default EventCalendar;