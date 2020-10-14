import React, { useState } from 'react'
import { Alert } from '@blueprintjs/core/lib/esm/components/alert/alert'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { Card } from '@blueprintjs/core/lib/esm/components/card/card'
import { Icon } from '@blueprintjs/core/lib/esm/components/icon/icon'
import { BookingPlaceData, FiniteDateRange, PlaceData } from '../interfaces'
import { Dialog } from '@blueprintjs/core/lib/esm/components/dialog/dialog'
import AppToaster from '../modules/toaster'
import EditPlace from './EditPlace'
import usePlacesCollection from '../modules/usePlacesCollection'
import BookPlace from './BookPlace'
import dateToString from '../modules/dateToString'
import styled from 'styled-components'
import usePaymentsCollection from '../modules/usePaymentsCollection'
import AddPayment from './AddPayment'
import Timestamp from '../modules/timestamp'

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
  const { add } = usePaymentsCollection(false)

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

  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const handlePaymentClose = () => setIsPaymentOpen(false)
  const handlePaymentOpen = () => setIsPaymentOpen(true)

  const removePlace = () => {
    remove(placeId)
    AppToaster.show({ message: 'Place deleted.', intent: 'warning' })
  }

  const createPayment = (bookingPlaceData: BookingPlaceData) => {
    const sendPayment = (amount: number, paidDays: FiniteDateRange) => {
      const {
        visitorName,
        placeName,
        startDate,
        endDate
      } = bookingPlaceData
      add({
        paymentDate: Timestamp.now(),
        visitorName,
        placeName,
        bookingDate: {
          startDate,
          endDate
        },
        amount,
        paidDays: {
          startDate: Timestamp.fromDate(paidDays.startDate),
          endDate: Timestamp.fromDate(paidDays.endDate)
        }
      })
      .then(() => AppToaster.show({ message: 'Payment added successfully' }))
      .catch(({ message }) => AppToaster.show({ message, intent: 'danger'}))
    }

    return sendPayment
  }

  const setUnpaidDays = (book: BookingPlaceData) => {
    const { startDate, endDate } = book
    if (endDate) return { startDate:  startDate.toDate(), endDate: endDate.toDate() }
    else return { startDate: startDate.toDate(), endDate: null }
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
        isOpen={isEditPlaceOpen}
        onClose={handleEditPlaceClose}
      >
        <EditPlace placeId={placeId} handleClose={handleEditPlaceClose} />
      </Dialog>
      <Dialog
        title='Booking Place'
        isOpen={isBookingPlaceOpen}
        onClose={handleBookingPlaceClose}
      >
        <BookPlace placeId={placeId} placeBookings={placeData.bookings} placeName={placeData.name} handleClose={handleBookingPlaceClose} />
      </Dialog>
      <Dialog
        title='Bookings'
        isOpen={isViewPlaceOpen}
        onClose={handleViewPlaceClose}
      >
        {placeData.bookings.sort(({ startDate }, { endDate }) => {
          if (endDate && startDate > endDate) return -1
          else return 1
        }).map((book, index) => 
          <Bookings key={index} isActual={book.startDate.toMillis() > Date.now() ? false : true}>
            <h4>{++index}</h4>
            <p>Amount: {book.amount}</p>
            <p>First Day: {dateToString(book.startDate.toDate())}</p>
            <p>Last Day: {book.endDate ? dateToString(book.endDate.toDate()) : 'Forever'}</p>
            <p>Visitor Name: {book.visitorName}</p>
            <Button onClick={handlePaymentOpen}>Add payment</Button>
            <Dialog
              title='Add payment'
              isOpen={isPaymentOpen}
              onClose={handlePaymentClose}
              canOutsideClickClose={false}
              isCloseButtonShown={false}
            >
              <AddPayment
                sendPayment={createPayment(book)}
                handlePaymentClose={handlePaymentClose}
                unPaidDays={setUnpaidDays(book)}
              />
            </Dialog>
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
