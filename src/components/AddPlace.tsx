import React, { useState } from 'react'
import usePlacesCollection from '../modules/usePlacesCollection'
import AppToaster from '../modules/toaster'
import Button from './Button'
import InputGroup from './InputGroup'

interface AddPlaceProps {
  onClose: () => void
}

const AddPlace: React.FC<AddPlaceProps> = ({ onClose }) => {
  const [name, setName] = useState<string>('')
  const [seats, setSeats] = useState<string>('')
  const { add } = usePlacesCollection(false)

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)

  const onSeatsChange = (event: React.ChangeEvent<HTMLInputElement>) => setSeats(event.target.value)

  const createNewPlace = () => {
    add({ name, seats: +seats })
      .then(() => {
        onClose()
        AppToaster.show({ message: 'Created new place.' })
      })
      .catch((error: Function) => console.log(error))
  }

  return (
    <>
      <h3 style={{ color: 'red' }}>Validation Error</h3>
      <InputGroup onChange={onNameChange} value={name} placeholder='Place name'></InputGroup>
      <InputGroup onChange={onSeatsChange} value={seats} placeholder='Seats'></InputGroup>
      <Button onClick={createNewPlace}>Add</Button>
    </>
  )
}

export default AddPlace
