import React, { useState } from 'react'
import useBookingPlace from '../modules/useBookingPlace'
import toaster from '../modules/toaster'
import dateToString from '../modules/dateToString'
import AddPayment from './AddPayment'
import BookingPlaceData from '../interfaces/BookingPlaceData'
import FiniteDateRange from '../interfaces/FiniteDateRange'
import CustomDateRange from '../interfaces/CustomDateRange'
import Button from './Button'
import InputGroup from './InputGroup'
import Checkbox from './Checkbox'
import Dialog from './Dialog'
import createFirebaseTimestampFromDate  from '../modules/createFirebaseTimestampFromDate'
import calculateDefaultPaidDays from '../modules/calculateDefaultPaidDays'
import AddBookingDates from './AddBookingDates'

interface BookPlaceProps {
  placeId: string
  onClose: () => void
  placeBookings: BookingPlaceData[]
  placeName: string
}

const BookPlace: React.FC<BookPlaceProps> = ({ onClose, placeId, placeBookings, placeName }) => {
  // Working with dates
  const [bookingDateRange, setBookingDateRange] = useState<CustomDateRange>()
  const [paidDays, setPaidDays] = useState<FiniteDateRange>()

  const [foreverFlag, setForeverFlag] = useState(false)
  const toggleForeverFlag = () => {
    setForeverFlag(!foreverFlag)
    if (bookingDateRange) {
      setBookingDateRange(bookingDateRange)
      setPaidDays(calculateDefaultPaidDays(bookingDateRange))
    }
  }

  // Getting info from inputs
  const [visitorName, setVisitorName] = useState<string>('')
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setVisitorName(event.target.value)

  const [amount, setAmount] = useState<number>()

  const [disabledFlag, setDisabledFlag] = useState(false)

  const setPayment = (amount: number, paidDays: FiniteDateRange) => {
    setAmount(amount)
    setPaidDays(paidDays)
  }

  // Getting and sending data with firebase
  const { book } = useBookingPlace(placeId)
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDisabledFlag(true)

    if (!bookingDateRange || !paidDays || !visitorName || !amount) {
      setDisabledFlag(false)
      return
    }
    else bookPlace(amount, paidDays, bookingDateRange)
  }

  const validateBookings = (existingBooking: BookingPlaceData, newBooking: BookingPlaceData) => {
    if (!newBooking.endDate) {
      if (!existingBooking.endDate) {
        return false
      } else if (existingBooking.endDate >= newBooking.startDate) {
        return false
      }
    }

    if (existingBooking.endDate) {
      if (
        existingBooking.endDate >= newBooking.startDate &&
        existingBooking.startDate <= newBooking.endDate!
      ) {
        return false
      }
    } else if (existingBooking.startDate < newBooking.endDate! ) {
      return false
    }

    return true
  }

  const bookPlace = (amount: number, paidDays: FiniteDateRange, bookingDateRange: CustomDateRange) => {
    const newBooking = {
      startDate: createFirebaseTimestampFromDate(bookingDateRange.startDate),
      endDate: bookingDateRange.endDate ? createFirebaseTimestampFromDate(bookingDateRange.endDate) : null,
      visitorName,
      placeName,
      amount,
      paidDays: {
        startDate: createFirebaseTimestampFromDate(paidDays.startDate),
        endDate: createFirebaseTimestampFromDate(paidDays.endDate)
      }
    }

    if (!placeBookings.every((existingBooking) => validateBookings(existingBooking, newBooking))) {
      toaster.show({ message: 'This place is already have booked on this day', intent: 'danger' })
      setDisabledFlag(false)
      return
    }
    book(newBooking, placeBookings)
    .then(() => {
      toaster.show({ message: 'The place has been booked' })
      setDisabledFlag(false)
      onClose()
    })
    .catch(({ message }) => {
      toaster.show({ message, intent: 'danger' })
      setDisabledFlag(false)
    })
  }

  // Managing modal windows
  const [isBookingDatesOpen, setIsBookingDatesOpen] = useState(false)
  const onBookingDatesOpen = () => setIsBookingDatesOpen(true)
  const onBookingDatesClose = () => setIsBookingDatesOpen(false)

  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const onPaymentOpen = () => setIsPaymentOpen(true)
  const onPaymentClose = () => setIsPaymentOpen(false)

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Checkbox
          checked={foreverFlag}
          onChange={toggleForeverFlag}
          disabled={disabledFlag}
          label='Forever booking'
        />
        <Button disabled={disabledFlag} onClick={onBookingDatesOpen}>
          {bookingDateRange ?
            `Booked Days: ${dateToString(bookingDateRange.startDate)} - 
            ${bookingDateRange?.endDate ? dateToString(bookingDateRange.endDate) : 'Forever'}` :
            'Choose Booking Dates'
          }
        </Button>
        <InputGroup 
          required
          disabled={disabledFlag}
          placeholder='Name'
          value={visitorName}
          onChange={onNameChange}
        />
        <Button onClick={onPaymentOpen} disabled={disabledFlag || !bookingDateRange}>
          {paidDays ?
            `Paid days: ${dateToString(paidDays.startDate)} - ${dateToString(paidDays.endDate)}` :
            'Add payment'
          }
        </Button>
        <Button type='submit' disabled={!bookingDateRange || !paidDays || !visitorName || !amount || disabledFlag}>
          Book
        </Button>
      </form>
      <AddBookingDates
        setBookingDateRange={setBookingDateRange}
        setPaidDays={setPaidDays}
        foreverFlag={foreverFlag}
        onBookingDatesClose={onBookingDatesClose}
        isBookingDatesOpen={isBookingDatesOpen}
      />
      <Dialog
        title='Add payment'
        isOpen={isPaymentOpen}
        onClose={onPaymentClose}
        canOutsideClickClose={false}
        isCloseButtonShown={false}
      >
        {paidDays &&
          <AddPayment
            defaultPaidDays={paidDays}
            onSubmit={setPayment}
            onPaymentComplete={onPaymentClose}
            foreverFlag={foreverFlag}
          />
        }
      </Dialog>
    </div>
  )
}

export default BookPlace
