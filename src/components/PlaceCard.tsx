import React, { useState } from 'react'
import toaster from '../modules/toaster'
import EditPlace from './EditPlace'
import usePlacesCollection from '../modules/usePlacesCollection'
import BookPlace from './BookPlace'
import dateToString from '../modules/dateToString'
import styled from 'styled-components'
import usePaymentsCollection from '../modules/usePaymentsCollection'
import AddPayment from './AddPayment'
import PlaceData from '../interfaces/PlaceData'
import BookingPlaceData from '../interfaces/BookingPlaceData'
import FiniteDateRange from '../interfaces/FiniteDateRange'
import Card from './Card'
import Icon from './Icon'
import Button from './Button'
import Dialog from './Dialog'
import Alert from './Alert'
import createFirebaseTimestampFromDate from '../modules/createFirebaseTimestampFromDate'
import createFirebaseNowTimestamp from '../modules/createFirebaseNowTimestamp'
import calculateDefaultPaidDays from '../modules/calculateDefaultPaidDays'

const Bookings = styled.div`
  padding-left: 10px;
  color: ${(props: {isActual: boolean}) => props.isActual ? 'black' : 'gray'};
`

interface PlaceCardProps {
  placeId: string
  placeData: PlaceData
}

const PlaceCard: React.FC<PlaceCardProps> = ({ placeId, placeData }) => {
  const { remove } = usePlacesCollection(false)
  const { add } = usePaymentsCollection(false)

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

  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const onPaymentClose = () => setIsPaymentOpen(false)
  const onPaymentOpen = () => setIsPaymentOpen(true)

  const removePlace = () => {
    remove(placeId)
    toaster.show({ message: 'Place deleted.', intent: 'warning' })
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
        paymentDate: createFirebaseNowTimestamp(),
        visitorName,
        placeName,
        bookingDate: {
          startDate,
          endDate
        },
        amount,
        paidDays: {
          startDate: createFirebaseTimestampFromDate(paidDays.startDate),
          endDate: createFirebaseTimestampFromDate(paidDays.endDate)
        }
      })
      .then(() => toaster.show({ message: 'Payment added successfully' }))
      .catch(({ message }) => toaster.show({ message, intent: 'danger'}))
    }

    return sendPayment
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
      <Dialog
        title='Bookings'
        isOpen={isViewPlaceOpen}
        onClose={onViewPlaceClose}
      >
        {placeData.bookings.sort(({ startDate }, { endDate }) => {
          if (endDate && startDate > endDate) return -1
          else return 1
        }).map((booking, index) => 
          <Bookings key={index} isActual={booking.startDate.toMillis() <= Date.now()}>
            <h4>{index + 1}</h4>
            <p>Amount: {booking.amount}</p>
            <p>First Day: {dateToString(booking.startDate.toDate())}</p>
            <p>Last Day: {booking.endDate ? dateToString(booking.endDate.toDate()) : 'Forever'}</p>
            <p>Visitor Name: {booking.visitorName}</p>
            <Button onClick={onPaymentOpen}>Add payment</Button>
            <Dialog
              title='Add payment'
              isOpen={isPaymentOpen}
              onClose={onPaymentClose}
              canOutsideClickClose={false}
              isCloseButtonShown={false}
            >
              <AddPayment
                onSubmit={createPayment(booking)}
                onPaymentComplete={onPaymentClose}
                defaultPaidDays={
                  calculateDefaultPaidDays({ startDate: booking.startDate.toDate(), endDate: booking.endDate?.toDate() || null })
                }
                foreverFlag={true}
              />
            </Dialog>
          </Bookings>
        )}
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
        <p>Are you sure you want to delete this place?</p>
      </Alert>
    </div>
  )
}

export default PlaceCard
