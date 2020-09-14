import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useCurrentPlaceInfo from './Firebase/useCurrentPlaceInfo'
import usePlacesCollection from './Firebase/usePlacesCollection'
import { AppToaster } from './toaster'

interface EditPlaceProps {
  handleClose: () => void
  placeId: string
}

const EditPlace: React.FC<EditPlaceProps> = ({handleClose, placeId}) => {
  const { placeData } = useCurrentPlaceInfo(placeId)
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
      .then(() => {
        handleClose()
        AppToaster.show({ message: 'Place edited.' })
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <h3 style={{ color: 'red' }}>Validation Error</h3>
      <InputGroup onChange={handlePlaceNameChange} value={name} placeholder='Place name'></InputGroup>
      <InputGroup onChange={handlePlaceSeatsChange} value={seats} placeholder='Seats' />
      <Link to='/places' onClick={editPlace}>
        <Button>Save</Button>
      </Link>
    </>
  )
}

export default EditPlace
