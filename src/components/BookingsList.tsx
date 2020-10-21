import React, { useState } from 'react'
import calculateDefaultPaidDays from '../modules/calculateDefaultPaidDays'
import Checkbox from './Checkbox'
import DateRangePicker from './DateRangePicker'
import AddPayment from './AddPayment'
import dateToString from '../modules/dateToString'
import styled from 'styled-components'
import Dialog from './Dialog'
import Button from './Button'
import PlaceData from '../interfaces/PlaceData'
import usePaymentsCollection from '../modules/usePaymentsCollection'
import createFirebaseTimestampFromDate from '../modules/createFirebaseTimestampFromDate'
import createFirebaseNowTimestamp from '../modules/createFirebaseNowTimestamp'
import BookingPlaceData from '../interfaces/BookingPlaceData'
import FiniteDateRange from '../interfaces/FiniteDateRange'
import toaster from '../modules/toaster'
import CustomDateRange from '../interfaces/CustomDateRange'
import addYears from '../modules/addYears'
import DatePicker from './DatePicker'
import usePlaceBookings from '../modules/usePlaceBookings'

const BookingItem = styled.div`
  padding-left: 10px;
  color: ${(props: {isActual: boolean}) => props.isActual ? 'black' : 'gray'};
`

interface BookingsProps {
  placeData: PlaceData
  placeId: string
}

const BookingsList: React.FC<BookingsProps> = ({ placeData, placeId }) => {
  const { add } = usePaymentsCollection(false)
  const { edit } = usePlaceBookings(placeId)

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

  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const onPaymentClose = () => setIsPaymentOpen(false)
  const onPaymentOpen = () => setIsPaymentOpen(true)

  const [isEditBookingOpen, setIsEditBookingOpen] = useState(false)
  const onEditBookingOpen = () => setIsEditBookingOpen(true)
  const onEditBookingClose = () => setIsEditBookingOpen(false)

  const [editBookingDates, setEditBookingDates] = useState<CustomDateRange>()

  const editBooking = (booking: BookingPlaceData) => {
    const newBookings = placeData.bookings.map((existingBooking) => {
      if (existingBooking !== booking) return existingBooking
      if (editBookingDates) {
        existingBooking.startDate = createFirebaseTimestampFromDate(editBookingDates.startDate)
        if (editBookingDates.endDate) existingBooking.endDate = createFirebaseTimestampFromDate(editBookingDates.endDate)
        else existingBooking.endDate = null
      }
      return existingBooking
    })

    edit(newBookings)
      .then(() => toaster.show({ message: 'Booking edited' }))
      .catch(({ message }) => toaster.show({ message, intent: 'danger' }))

    onEditBookingClose()
  }

  const [foreverFlag, setForeverFlag] = useState(false)
  const toggleForeverFlag = () => setForeverFlag(!foreverFlag)

  return (
    <div>
      {placeData.bookings.sort(({ startDate }, { endDate }) => {
          if (endDate && startDate > endDate) return -1
          else return 1
        }).map((booking, index) =>
          <BookingItem key={index} isActual={booking.startDate.toMillis() <= Date.now()}>
            <h4>{index + 1}</h4>
            <p>Amount: {booking.amount}</p>
            <p>First Day: {dateToString(booking.startDate.toDate())}</p>
            <p>Last Day: {booking.endDate ? dateToString(booking.endDate.toDate()) : 'Forever'}</p>
            <p>Visitor Name: {booking.visitorName}</p>
            <Button onClick={onPaymentOpen}>Add payment</Button>
            <Button onClick={onEditBookingOpen}>Edit</Button>
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
                  calculateDefaultPaidDays({
                    startDate: booking.startDate.toDate(), endDate: booking.endDate?.toDate() || null
                  })
                }
                foreverFlag={true}
              />
            </Dialog>
            <Dialog title='Edit booking' isOpen={isEditBookingOpen} onClose={onEditBookingClose}>
              <Checkbox checked={foreverFlag} onChange={toggleForeverFlag}>Forever booking</Checkbox>
              {foreverFlag
              ? <DatePicker
                  onChange={(startDate) => startDate && setEditBookingDates({ startDate, endDate: null })}
                  minDate={booking.startDate.toDate()}
                  maxDate={addYears(booking.startDate.toDate(), 2)}
                  highlightCurrentDay
                  defaultValue={booking.startDate.toDate()}
                />
              : <DateRangePicker
                  shortcuts={false}
                  minDate={booking.startDate.toDate()}
                  maxDate={addYears(booking.startDate.toDate(), 2)}
                  defaultValue={booking.endDate
                    ? [booking.startDate.toDate(), booking.endDate.toDate()]
                    : [booking.startDate.toDate(), null]
                  }
                  onChange={
                    ([startDate, endDate]) => startDate && endDate && setEditBookingDates({ startDate, endDate })
                  }
                />
              }
              <Button onClick={() => editBooking(booking)}>Edit</Button>
            </Dialog>
          </BookingItem>
        )}
    </div>
  )
}

export default BookingsList
