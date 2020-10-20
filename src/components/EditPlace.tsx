import React, { useState } from 'react'
import usePlacesCollection from '../modules/usePlacesCollection'
import AppToaster from '../modules/toaster'
import InputGroup from './InputGroup'
import Button from './Button'

interface EditPlaceProps {
  onClose: () => void
  placeId: string
  defaultName: string
  defaultSeats: string
}

const EditPlace: React.FC<EditPlaceProps> = ({ onClose, placeId, defaultName, defaultSeats }) => {
  const [name, setName] = useState<string>(() => defaultName)
  const [seats, setSeats] = useState<string>(() => defaultSeats)
  const { edit } = usePlacesCollection(false)

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)

  const onSeatsChange = (event: React.ChangeEvent<HTMLInputElement>) => setSeats(event.target.value)

  const editPlace = () => {
    edit(placeId, { name, seats: +seats })
      .then(() => {
        onClose()
        AppToaster.show({ message: 'Place edited.' })
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <h3 style={{ color: 'red' }}>Validation Error</h3>
      <InputGroup onChange={onNameChange} value={name} placeholder='Place name'></InputGroup>
      <InputGroup onChange={onSeatsChange} value={seats} placeholder='Seats' />
      <Button onClick={editPlace}>Save</Button>
    </>
  )
}

export default EditPlace
