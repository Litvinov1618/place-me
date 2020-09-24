import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup'
import React, { useState, useEffect } from 'react'
import useCurrentPlaceInfo from '../modules/useCurrentPlaceInfo'
import usePlacesCollection from '../modules/usePlacesCollection'
import { AppToaster } from '../modules/toaster'

interface EditPlaceProps {
  handleClose: () => void
  placeId: string
}

const EditPlace: React.FC<EditPlaceProps> = ({ handleClose, placeId }) => {
  const [name, setName] = useState<string>('')
  const [seats, setSeats] = useState<string>('')
  const { placeData } = useCurrentPlaceInfo(placeId)
  const { edit } = usePlacesCollection(false)

  useEffect(() => {
    if (placeData) {
      setName(placeData.name)
      setSeats(String(placeData.seats))
    }
  }, [placeData])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)

  const handleSeatsChange = (event: React.ChangeEvent<HTMLInputElement>) => setSeats(event.target.value)

  const editPlace = () => {
    edit(placeId, { name, seats: +seats })
      .then(() => {
        handleClose()
        AppToaster.show({ message: 'Place edited.' })
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <h3 style={{ color: 'red' }}>Validation Error</h3>
      <InputGroup onChange={handleNameChange} value={name} placeholder='Place name'></InputGroup>
      <InputGroup onChange={handleSeatsChange} value={seats} placeholder='Seats' />
      <Button onClick={editPlace}>Save</Button>
    </>
  )
}

export default EditPlace
