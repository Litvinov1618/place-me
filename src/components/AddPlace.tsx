import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputGroup, Navbar, NavbarGroup, NavbarHeading, Button } from '@blueprintjs/core'
import usePlacesCollection from './Firebase/useCollectionPlaces'

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
    setName('')
    setSeats('')
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
      <Button onClick={() => createNewPlace()}>Add</Button>
    </>
  )
}

export default AddPlace
