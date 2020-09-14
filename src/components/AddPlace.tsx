import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputGroup, Navbar, NavbarGroup, NavbarHeading, Button } from '@blueprintjs/core'
import usePlacesCollection from './Firebase/usePlacesCollection'

const AddPlace: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [seats, setSeats] = useState<string>('')
  const { add } = usePlacesCollection(false)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleSeatsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeats(event.target.value)
  }

  const createNewPlace = () => {
    add({ name, seats: +seats })
  }

  return (
    <>
      <Navbar>
        <NavbarGroup>
          <Link to='/places'>
            <Button minimal icon='undo'/>
          </Link>
          <NavbarHeading>Add Place</NavbarHeading>
        </NavbarGroup>
      </Navbar>
      <h3 style={{color: 'red'}}>Validation Error</h3>
      <InputGroup onChange={handleNameChange} value={name} placeholder="Place name"></InputGroup>
      <InputGroup onChange={handleSeatsChange} value={seats} placeholder="Seats"></InputGroup>
      <Link to='/places' onClick={() => createNewPlace()}>
        <Button>Add</Button>
      </Link>
    </>
  )
}

export default AddPlace
