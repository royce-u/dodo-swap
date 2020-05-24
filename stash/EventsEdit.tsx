// import React, { FormEvent, useState, useEffect } from 'react'
// import { Button, Container, Form } from 'semantic-ui-react'
// import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
// //custom components
// import { Decoded } from '../../App'
// import { Redirect } from 'react-router-dom';

// interface EventsEditProps {
//     user: Decoded | null
// }


// const EventEdit: React.FC<EventsEditProps> = props => {

//     let token = localStorage.getItem('boilerToken')
//     const [date, setDate] = useState('')
//     const [time, setTime] = useState('')
//     const [maxVisitor, setMaxVisitor] = useState(1)
//     const [dodoCode, setDodoCode] = useState('')
//     const [hostDescription, sethostDescription] = useState('')
//     const [userId, setUserId]=useState<string | null>('')
//     const [hostId, setHostId] = useState('')
//     // const [attendees, setAttendees] = useState('')
//     const [privater, setPrivater] = useState(false)
//     const [redirect, setRedirect] = useState(false)

//     const handleChangeDate = (e:FormEvent,{goat, value}:any) => {
//         setDate(value)
//         // setEventInfo({
//         //     date: value,
//         //     time: name
//         // })
//         console.log(date)
//         console.log('props.use------->',props.user)

//     }
//     const handleChangeTime = (e:any,{name, value}:any) => {
//         setTime(value)
//         // setEventInfo({
//         //     date: value,
//         //     time: name
//         // })
//         // console.log(eventInfo)
//         console.log(time)

//     }

//     const handleSubmit = ((e:FormEvent) => {
//         e.preventDefault()
//         let token = localStorage.getItem('boilerToken')
//         fetch(process.env.REACT_APP_SERVER_URL + 'event', {
//             method: 'POST',
//             body: JSON.stringify({
//                 date: date,
//                 time: time,
//                 maxVisitor: maxVisitor,
//                 description: hostDescription, 
//                 hostId: idee

//             }),
//             headers: {
//                 'Content-type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
            
//         })
//         setRedirect(true)
        
//     })
//     if (!props.user){
//         //return loading spinner
//         return null
//     }
//     let idee = props.user._id ? props.user._id: undefined
    

//     return(
//         <Container>
//             <Form onSubmit={(e) =>handleSubmit(e)}>
//                 <Form.Group>
//                     <Form.Field>
//                         <label>Date:</label>
//                         <DateInput value={date} onChange={handleChangeDate} goat="date" />
//                     </Form.Field>
//                     <Form.Field>
//                         <label>Time:</label>
//                         <TimeInput value={time} onChange={handleChangeTime} name="time" />
//                     </Form.Field>
//                     <Form.Field onChange={(e:any) => setMaxVisitor(e.target.value)}label='Max Visitors' control='select' name="maxVisitor">
//                         <option value='1'>1</option>
//                         <option value='2'>2</option>
//                         <option value='3'>3</option>
//                         <option value='4'>4</option>
//                         <option value='5'>5</option>
//                         <option value='6'>6</option>
//                         <option value='7'>7</option>
//                     </Form.Field>
                
//                 </Form.Group>
//                 <Form.Field onChange={(e:any) => sethostDescription(e.target.value)}value={hostDescription} label='Description' control='textarea' rows='3' name="comments" />
                
//                 <input onChange={(e:any) => setHostId(e.target.value)}type="hidden" value={idee} name="hostId" />
//                 <Button type="submit" >Create Event</Button>
//             </Form>
//             {redirect&&<Redirect to="/event" />}
//         </Container>
//     )
// }


// export default EventEdit