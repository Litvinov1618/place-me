import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputGroup, Navbar, NavbarGroup, NavbarHeading, Button } from '@blueprintjs/core'
import usePlacesCollection from './Firebase/useCollectionPlaces'

const AddPlace: React.FC = () => {
  const [placeName, setPlaceName] = useState<string>('')
  const [placeSeats, setPlaceSeats] = useState<string>('')
  const { addPlace } = usePlacesCollection(false)

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
      <InputGroup onChange={handlePlaceNameChange} value={placeName} placeholder="Place name"></InputGroup>
      <InputGroup onChange={handlePlaceSeatsChange} value={placeSeats} placeholder="Seats"></InputGroup>
      <Button onClick={() => createNewPlace()}>Add</Button>
    </>
  )
}

export default AddPlace
