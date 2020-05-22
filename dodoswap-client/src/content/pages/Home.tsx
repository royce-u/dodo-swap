import React from 'react'
import { Route } from 'react-router-dom'

import Signup from './Signup'
import { Decoded } from '../../App'
import '../../css/Home.css'

//props
interface HomeProps {
  user: Decoded | null,
  updateToken: (newToken: string | null) => void
}

const Home: React.FC<HomeProps> = props => {
  
  return (
   <div> 
      <Signup user={props.user} updateToken={props.updateToken}/>    
   </div>
  )
}

export default Home
