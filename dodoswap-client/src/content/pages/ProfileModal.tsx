import React, { FormEvent, useState } from 'react'
import { Decoded } from '../../App'
import { Button, Form, Header, Icon, Input, Modal } from 'semantic-ui-react'

// //props
// interface ModalProps {
//     user: Decoded | null
// }

const ProfileModal: React.FC = props => {
    let [email, setEmail] = React.useState<String>('')
    let [firstname, setFirstname] = React.useState<String>('')
    let [lastname, setLastname] = React.useState<String>('')
    let [acName, setAcname] = React.useState<String>('')
    let [islandName, setIslandName] = React.useState<String>('')
    let [nativeFruit, setNativeFruit] = React.useState<String>('')
    let [pic, setPic] = React.useState<String>('')


    //fetch call to submit user profile edits
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        //Send the user sign up data to the server
        console.log('submit', email, firstname, lastname, acName, islandName, nativeFruit, pic)

        // // Fetch call to POST data
        // fetch(process.env.REACT_APP_SERVER_URL + 'auth/login', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     email
        //   }),
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
    }


    return (
        <Modal trigger={<Icon name='edit' size='large'></Icon>} size={"small"} as={Form} onSubmit={(e: React.FormEvent) => handleSubmit(e)} closeIcon>
            <Header icon='user circle' content='Edit your profile' />
            <Modal.Content>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Form.Input label="First Name" name="firstname" placeholder="Your first name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstname(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input label="Last Name" name="lastname" placeholder="Your last name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastname(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input label="AC User Name" name="acName" placeholder="Your AC user name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAcname(e.target.value)} />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Form.Input label="Island Name" name="islandName" placeholder="Your island name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIslandName(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input label="Native Fruit" name="nativeFruit" placeholder="Your last name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNativeFruit(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input label="Email" name="email" placeholder="Your email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    </Form.Field>
                </Form.Group>

                <Form.Field>
                    <label>Profile Pic</label>
                    <Input name="pic" placeholder="link to pic" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPic(e.target.value)} />
                </Form.Field>
                <Button type="submit">Update</Button>
            </Modal.Content>
        </Modal>
    )
}
    export default ProfileModal
