import React, { useState, useEffect } from 'react'
import { Navbar, NavbarGroup, Button, NavbarHeading, InputGroup } from '@blueprintjs/core'
import { Link } from 'react-router-dom'
import useCurrentPlace from './Firebase/useCurrentPlace'
import usePlacesCollection from './Firebase/usePlacesCollection'

const EditPlace: React.FC = () => {
  const placeId = window.location.href.slice(-25, -5)

  const { placeData } = useCurrentPlace(placeId)
  const { edit } = usePlacesCollection(false)
  const [name, setName] = useState<string>('')
  const [seats, setSeats] = useState<string>('')

  useEffect(() => {
    if(placeData) {
      setName(placeData.name)
      setSeats(placeData.seats + '')
    }
  }, [placeData])

  const handlePlaceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handlePlaceSeatsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeats(event.target.value)
  }

  const editPlace = () => {
    edit(placeId, { name, seats: +seats })
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
      <h3 style={{ color: 'red' }}>Validation Error</h3>
      <InputGroup onChange={handlePlaceNameChange} value={name} placeholder='Place name'></InputGroup>
      <InputGroup onChange={handlePlaceSeatsChange} value={seats} placeholder='Seats' />
      <Link to='/places' onClick={editPlace}>
        <Button>Save</Button>
      </Link>
    </div>
  )
}

export default EditPlace
