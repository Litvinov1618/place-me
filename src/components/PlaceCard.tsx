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
import dateToString from '../modules/dateToString'
import styled from 'styled-components'

const Bookings = styled.div`
  padding-left: 10px;
  color: ${(props: {isActual: Boolean}) => props.isActual ? 'black' : 'gray'};
`

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

  const [isViewPlaceOpen, setIsViewPlaceOpen] = useState(false)
  const handleViewPlaceOpen = () => setIsViewPlaceOpen(true)
  const handleViewPlaceClose = () => setIsViewPlaceOpen(false)

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
        <Button onClick={handleViewPlaceOpen}>View Bookings</Button>
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
      <Dialog
        title='Bookings'
        isOpen={isViewPlaceOpen}
        onClose={handleViewPlaceClose}
        isCloseButtonShown
      >
        {placeData.bookings.sort(({ startDate }, { endDate }) => {
          if (startDate > endDate) return -1
          else return 1
        }).map((book, index) => 
          <Bookings isActual={book.endDate.toMillis() < Date.now() || book.startDate.toMillis() > Date.now() ? false : true}>
            <h4>{index+= 1}</h4>
            <p>Amount: {book.amount}</p>
            <p>First Day: {dateToString(book.startDate.toDate())}</p>
            <p>Last Day: {dateToString(book.endDate.toDate())}</p>
            <p>Visitor Name: {book.visitorName}</p>
          </Bookings>
        )}
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
