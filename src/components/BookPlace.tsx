import React, { useState } from 'react'
import DateRangePicker from './DateRangePicker'
import useBookingPlace from '../modules/useBookingPlace'
import toaster from '../modules/toaster'
import dateToString from '../modules/dateToString'
import DatePicker from './DatePicker'
import AddPayment from './AddPayment'
import addYears from '../modules/addYears'
import BookingPlaceData from '../interfaces/BookingPlaceData'
import FiniteDateRange from '../interfaces/FiniteDateRange'
import CustomDateRange from '../interfaces/CustomDateRange'
import Button from './Button'
import InputGroup from './InputGroup'
import Checkbox from './Checkbox'
import Dialog from './Dialog'
import createFirebaseTimestampFromDate  from '../modules/createFirebaseTimestampFromDate'

interface BookPlaceProps {
  placeId: string
  onClose: () => void
  placeBookings: BookingPlaceData[]
  placeName: string
}

const BookPlace: React.FC<BookPlaceProps> = ({ onClose, placeId, placeBookings, placeName }) => {
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

    if (!bookedDays || !paidDays || !visitorName || !amount) {
      setDisabledFlag(false)
      return
    }
    else bookPlace(amount, paidDays, bookedDays)
  }

  const bookPlace = (amount: number, paidDays: FiniteDateRange, bookedDays: CustomDateRange) => {
    if (!bookedDays) return
    book(
      {
        startDate: createFirebaseTimestampFromDate(bookedDays.startDate),
        endDate: bookedDays.endDate ? createFirebaseTimestampFromDate(bookedDays.endDate) : null,
        visitorName,
        placeName,
        amount,
        paidDays: {
          startDate: createFirebaseTimestampFromDate(paidDays.startDate),
          endDate: createFirebaseTimestampFromDate(paidDays.endDate)
        }
      }, placeBookings
    )
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
  const onBookingDateOpen = () => setIsBookingDatesOpen(true)
  const onBookingDatesClose = () => setIsBookingDatesOpen(false)

  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const onPaymentOpen = () => setIsPaymentOpen(true)
  const onPaymentClose = () => setIsPaymentOpen(false)

  // Working with dates
  const [bookedDays, setBookedDays] = useState<CustomDateRange>(null)
  const [paidDays, setPaidDays] = useState<FiniteDateRange | null>(null)
  const currentDay = new Date()

  const [foreverFlag, setForeverFlag] = useState(false)
  const toggleForeverFlag = () => {
    setForeverFlag(!foreverFlag)
    if (bookedDays) {
      setBookedDays({ startDate: bookedDays.startDate, endDate: null })
    }
  }

  const onForeverDateRangeChange = (startDate: Date) => {
    setBookedDays({ startDate, endDate: null })
    onBookingDatesClose()
  }

  const onFiniteDateRangeChange = (bookedDays: FiniteDateRange) => {
    if (bookedDays.startDate && bookedDays.endDate) {
      setBookedDays(bookedDays)
      onBookingDatesClose()
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Checkbox
          checked={foreverFlag}
          onChange={toggleForeverFlag}
          disabled={disabledFlag}
          label='Forever booking'
        />
        <Button disabled={disabledFlag} onClick={onBookingDateOpen}>
          {bookedDays ?
            `Booked Days: ${dateToString(bookedDays.startDate)} - ${bookedDays?.endDate ? dateToString(bookedDays.endDate) : 'Forever'}` :
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
        <Button onClick={onPaymentOpen} disabled={disabledFlag || !bookedDays}>
          {paidDays ?
            `Paid days: ${dateToString(paidDays.startDate)} - ${dateToString(paidDays.endDate)}` :
            'Add payment'
          }
        </Button>
        <Button type='submit' disabled={!bookedDays || !paidDays || !visitorName || !amount || disabledFlag}>
          Book
        </Button>
      </form>
      <Dialog
        title='Select dates for booking'
        isOpen={isBookingDatesOpen}
        onClose={onBookingDatesClose}
        canOutsideClickClose={false}
        isCloseButtonShown={false}
      >
        {foreverFlag ?
          <DatePicker
            minDate={currentDay}
            maxDate={addYears(currentDay, 4)}
            onChange={onForeverDateRangeChange}
          /> :
          <DateRangePicker
            contiguousCalendarMonths
            minDate={currentDay}
            maxDate={addYears(currentDay, 4)}
            shortcuts={false}
            onChange={
              ([startDate, endDate]) => startDate && endDate && onFiniteDateRangeChange({ startDate, endDate })
            }
          />
        }
      </Dialog>
      <Dialog
        title='Add payment'
        isOpen={isPaymentOpen}
        onClose={onPaymentClose}
        canOutsideClickClose={false}
        isCloseButtonShown={false}
      >
        {bookedDays &&
          <AddPayment unpaidDays={bookedDays} getPaymentInfo={setPayment} onPaymentComplete={onPaymentClose} />
        }
      </Dialog>
    </div>
  )
}

export default BookPlace
