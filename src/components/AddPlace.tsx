import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputGroup, Navbar, NavbarGroup, NavbarHeading, Button } from '@blueprintjs/core'

interface AddPlaceProps {
  addPlace: (placeName: string, placeSeats: number) => void
}

const AddPlace: React.FC<AddPlaceProps> = ({addPlace}) => {
  const [placeName, setPlaceName] = useState<string>('')
  const [placeSeats, setPlaceSeats] = useState<string>('')

  const handlePlaceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceName(event.target.value)
  }

  const handlePlaceSeatsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceSeats(event.target.value)
  }

  const createNewPlace = () => {
    addPlace(placeName, +placeSeats)
    setPlaceName('')
    setPlaceSeats('')
  }

  return (
    <div>
      <Navbar>
        <NavbarGroup>
          <Link to='/places'>
            <Button minimal icon='undo'/>
          </Link>
          <NavbarHeading>Add Place</NavbarHeading>
        </NavbarGroup>
      </Navbar>
      <h3 style={{color: 'red'}}>Validation Error</h3>
      <InputGroup onChange={handlePlaceNameChange} value={placeName} placeholder="Place name"></InputGroup>
      <InputGroup onChange={handlePlaceSeatsChange} value={placeSeats} placeholder="Seats"></InputGroup>
      <Button onClick={() => createNewPlace()}>Add</Button>
    </div>
  )
}

export default AddPlace
