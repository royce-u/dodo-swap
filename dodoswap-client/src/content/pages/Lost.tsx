import React from 'react'
import {Container, Image} from 'semantic-ui-react'

const Lost: React.FC = () => {
    return (
        <Container>   
            <h1>404. We seem to have lost our way and wandered into the desert.</h1>
            <h1>Maybe go back home? </h1>
            <Image src="https://i.redd.it/vsn9d28op0r41.jpg"/>
        </Container>
    )
}

export default Lost