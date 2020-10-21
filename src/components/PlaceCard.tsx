import React, { useState } from 'react'
import toaster from '../modules/toaster'
import EditPlace from './EditPlace'
import usePlacesCollection from '../modules/usePlacesCollection'
import BookPlace from './BookPlace'
import PlaceData from '../interfaces/PlaceData'
import Card from './Card'
import Icon from './Icon'
import Button from './Button'
import Dialog from './Dialog'
import Alert from './Alert'
import BookingsList from './BookingsList'

interface PlaceCardProps {
  placeId: string
  placeData: PlaceData
}

const PlaceCard: React.FC<PlaceCardProps> = ({ placeId, placeData }) => {
  const { remove } = usePlacesCollection(false)

  const [isEditPlaceOpen, setIsEditPlaceOpen] = useState(false)
  const onEditPlaceClose = () => setIsEditPlaceOpen(false)
  const onEditPlaceOpen = () => setIsEditPlaceOpen(true)

  const [isBookingPlaceOpen, setIsBookingPlaceOpen] = useState(false)
  const onBookingPlaceOpen = () => setIsBookingPlaceOpen(true)
  const onBookingPlaceClose = () => setIsBookingPlaceOpen(false)

  const [isDeletionAlertOpen, setIsDeletionAlertOpen] = useState(false)
  const onDeletionAlertOpen = () => setIsDeletionAlertOpen(true)
  const onDeletionAlertClose = () => setIsDeletionAlertOpen(false)

  const [isViewPlaceOpen, setIsViewPlaceOpen] = useState(false)
  const onViewPlaceOpen = () => setIsViewPlaceOpen(true)
  const onViewPlaceClose = () => setIsViewPlaceOpen(false)

  const removePlace = () => {
    remove(placeId)
      .then(() => toaster.show({ message: 'Place deleted.' }))
      .catch(({ message }) => toaster.show({ message, intent: 'warning' }))
  }

  return (
    <div>
      <Card key={placeId}>
        <h3>{placeData.name}</h3>
        <p>
          <Icon icon='people' /> {placeData.seats}
        </p>
        <Button onClick={onBookingPlaceOpen}>Book</Button>
        <Button onClick={onEditPlaceOpen}>Edit</Button>
        <Button onClick={onViewPlaceOpen}>View Bookings</Button>
        <Button onClick={onDeletionAlertOpen} intent='danger'>Delete</Button>
      </Card>
      <Dialog
        title='Bookings'
        isOpen={isViewPlaceOpen}
        onClose={onViewPlaceClose}
      >
        <BookingsList placeData={placeData} placeId={placeId} />
      </Dialog>
      <Dialog
        title='Edit Place'
        isOpen={isEditPlaceOpen}
        onClose={onEditPlaceClose}
      >
        <EditPlace 
          defaultName={placeData.name}
          defaultSeats={placeData.seats + ''}
          placeId={placeId}
          onClose={onEditPlaceClose}
        />
      </Dialog>
      <Dialog
        title='Booking Place'
        isOpen={isBookingPlaceOpen}
        onClose={onBookingPlaceClose}
      >
        <BookPlace
          placeId={placeId}
          placeBookings={placeData.bookings}
          placeName={placeData.name}
          onClose={onBookingPlaceClose}
        />
      </Dialog>
      <Alert
        isOpen={isDeletionAlertOpen}
        onClose={onDeletionAlertClose}
        cancelButtonText='Cancel'
        confirmButtonText='Delete'
        onCancel={onDeletionAlertClose}
        onConfirm={removePlace}
        intent='danger'
      >
        Are you sure you want to delete this place?
      </Alert>
    </div>
  )
}

export default PlaceCard
