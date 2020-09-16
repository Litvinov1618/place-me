import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup'
import React, { useState } from 'react'
import usePlacesCollection from '../modules/usePlacesCollection'
import { AppToaster } from '../modules/toaster'

interface AddPlaceProps {
  handleClose: () => void
}

const AddPlace: React.FC<AddPlaceProps> = ({ handleClose }) => {
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
      .then(() => {
        handleClose()
        AppToaster.show({ message: 'Created new place.' })
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <h3 style={{ color: 'red' }}>Validation Error</h3>
      <InputGroup onChange={handleNameChange} value={name} placeholder='Place name'></InputGroup>
      <InputGroup onChange={handleSeatsChange} value={seats} placeholder='Seats'></InputGroup>
      <Button onClick={createNewPlace}>Add</Button>
    </>
  )
}

export default AddPlace
