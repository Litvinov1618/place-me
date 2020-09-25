import React, { useState } from 'react'
import { Alert } from '@blueprintjs/core/lib/esm/components/alert/alert'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { Card } from '@blueprintjs/core/lib/esm/components/card/card'
import { Icon } from '@blueprintjs/core/lib/esm/components/icon/icon'
import { PlaceData } from '../interfaces'
import { Dialog } from '@blueprintjs/core/lib/esm/components/dialog/dialog'
import { AppToaster } from '../modules/toaster'
import EditPlace from './EditPlace'
import usePlacesCollection from '../modules/usePlacesCollection'
import BookPlace from './BookPlace'

interface PlaceCardProps {
  placeId: string
  placeData: PlaceData
}

const PlaceCard: React.FC<PlaceCardProps> = ({ placeId, placeData }) => {
  const { remove } = usePlacesCollection(false)

  const [isEditPlaceOpen, setIsEditPlaceOpen] = useState(false)
  const handleEditPlaceClose = () => setIsEditPlaceOpen(false)
  const handleEditPlaceOpen = () => setIsEditPlaceOpen(true)
  
  const [isBookingPlaceOpen, setIsBookingPlaceOpen] = useState(false)
  const handleBookingPlaceOpen = () => setIsBookingPlaceOpen(true)
  const handleBookingPlaceClose = () => setIsBookingPlaceOpen(false)

  const [isDeletionAlertOpen, setIsDeletionAlertOpen] = useState(false)
  const handleDeletionAlertOpen = () => setIsDeletionAlertOpen(true)
  const handleDeletionAlertClose = () => setIsDeletionAlertOpen(false)  

  const removePlace = () => {
    remove(placeId)
    AppToaster.show({ message: 'Place deleted.', intent: 'warning' })
  }

  return (
    <div>
      <Card key={placeId}>
        <h3>{placeData.name}</h3>
        <p>
          <Icon icon='people' /> {placeData.seats}
        </p>
        <Button onClick={handleBookingPlaceOpen}>Book</Button>
        <Button onClick={handleEditPlaceOpen}>Edit</Button>
        <Button onClick={handleDeletionAlertOpen} intent='danger'>Delete</Button>
      </Card>
      <Dialog
        title='Edit Place'
        canOutsideClickClose
        isCloseButtonShown
        isOpen={isEditPlaceOpen}
        onClose={handleEditPlaceClose}
      >
        <EditPlace placeId={placeId} handleClose={handleEditPlaceClose} />
      </Dialog>
      <Dialog
        title='Booking Place'
        canOutsideClickClose
        isCloseButtonShown
        isOpen={isBookingPlaceOpen}
        onClose={handleBookingPlaceClose}
      >
        <BookPlace placeId={placeId} placeBookings={placeData.bookings} placeName={placeData.name} handleClose={handleBookingPlaceClose} />
      </Dialog>
      <Alert
        isOpen={isDeletionAlertOpen}
        onClose={handleDeletionAlertClose}
        cancelButtonText='Cancel'
        confirmButtonText='Delete'
        onCancel={handleDeletionAlertClose}
        onConfirm={removePlace}
        intent='danger'
      >
        <p>Are you sure you want to delete this place?</p>
      </Alert>
    </div>
  )
}

export default PlaceCard
