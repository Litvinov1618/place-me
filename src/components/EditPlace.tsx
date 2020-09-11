import React, { useState } from 'react'
import { Navbar, NavbarGroup, Button, NavbarHeading, InputGroup } from '@blueprintjs/core'
import { Link } from 'react-router-dom'
import usePlacesCollection from './Firebase/useCollectionPlaces'

const EditPlace: React.FC = () => {
  const placeId = window.location.href.slice(-25, -5)

  const { edit } = usePlacesCollection(false)
  const [placeName, setPlaceName] = useState<string>('')
  const [placeSeats, setPlaceSeats] = useState<string>('')

  const handlePlaceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceName(event.target.value)
  }

  const handlePlaceSeatsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceSeats(event.target.value)
  }

  const editPlace = () => {
    edit(placeId, placeName, +placeSeats)
  }

  return (
    <div>
      <Navbar>
        <NavbarGroup>
          <Link to='/places'>
            <Button minimal icon='undo' />
          </Link>
          <NavbarHeading>Edit Place</NavbarHeading>
        </NavbarGroup>
      </Navbar>
      <h3 style={{color: 'red'}}>Validation Error</h3>
      <InputGroup onChange={handlePlaceNameChange} value={placeName} placeholder='Place name' />
      <InputGroup onChange={handlePlaceSeatsChange} value={placeSeats} placeholder='Seats' />
      <Button onClick={editPlace}>Save</Button>
    </div>
  )
}

export default EditPlace
