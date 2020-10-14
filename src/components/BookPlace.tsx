import React, { useState } from 'react'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup'
import { Dialog } from '@blueprintjs/core/lib/esm/components/dialog/dialog'
import DateRangePicker from './DateRangePicker'
import useBookingPlace from '../modules/useBookingPlace'
import { FiniteDateRange, BookingPlaceData, CustomDateRange} from '../interfaces'
import Timestamp from '../modules/timestamp'
import AppToaster from '../modules/toaster'
import dateToString from '../modules/dateToString'
import DatePicker from './DatePicker'
import { Checkbox } from '@blueprintjs/core/lib/esm/components/forms/controls'
import AddPayment from './AddPayment'
import addYears from '../modules/addYears'

interface BookPlaceProps {
  placeId: string
  handleClose: () => void
  placeBookings: BookingPlaceData[]
  placeName: string
}

const BookPlace: React.FC<BookPlaceProps> = ({ handleClose, placeId, placeBookings, placeName }) => {
  // Getting info from inputs
  const [visitorName, setVisitorName] = useState<string>('')
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setVisitorName(event.target.value)

  const [amount, setAmount] = useState<number>()

  const [isFormsDisabled, setIsFormsDisabled] = useState(false)

  const sendPayment = (amount: number, paidDays: FiniteDateRange) => {
    setAmount(amount)
    setPaidDays(paidDays)
  }

  // Getting and sending data with firebase
  const { book } = useBookingPlace(placeId)
  const bookPlace = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsFormsDisabled(true)

    if (bookedDays && paidDays && visitorName && amount) {
      book(
        {
          startDate: Timestamp.fromDate(bookedDays.startDate),
          endDate: bookedDays.endDate ? Timestamp.fromDate(bookedDays.endDate) : null,
          visitorName,
          placeName,
          amount,
          paidDays: {
            startDate: Timestamp.fromDate(paidDays.startDate),
            endDate: Timestamp.fromDate(paidDays.endDate)
          }
        }, placeBookings
      )
      .then(() => {
        AppToaster.show({ message: 'The place has been booked' })
        setIsFormsDisabled(false)
        handleClose()
      })
      .catch(({ message }) => {
        AppToaster.show({ message, intent: 'danger' })
        setIsFormsDisabled(false)
      })
    }
  }

  // Managing modal windows
  const [isBookingDatesOpen, setIsBookingDatesOpen] = useState(false)
  const handleBookingDateOpen = () => setIsBookingDatesOpen(true)
  const handleBookingDatesClose = () => setIsBookingDatesOpen(false)

  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const handlePaymentOpen = () => setIsPaymentOpen(true)
  const handlePaymentClose = () => setIsPaymentOpen(false)

  // Working with dates
  const [bookedDays, setBookedDays] = useState<CustomDateRange>(null)
  const [paidDays, setPaidDays] = useState<FiniteDateRange | null>(null)
  const currentDay = new Date()

  const [foreverBooking, setForeverBooking] = useState(false)
  const handleForeverBooking = () => {
    setForeverBooking(!foreverBooking)
    setBookedDays(null)
    setPaidDays(null)
  }

  const handleForeverDateRangeChange = (startDate: Date) => {
    setBookedDays({ startDate, endDate: null })
    handleBookingDatesClose()
  }

  const handleFiniteDateRangeChange = (bookedDays: FiniteDateRange) => {
    if (bookedDays.startDate && bookedDays.endDate) {
      setBookedDays(bookedDays)
      handleBookingDatesClose()
    }
  }

  return (
    <div>
      <form onSubmit={bookPlace}>
        <Checkbox
          checked={foreverBooking}
          onChange={handleForeverBooking}
          disabled={isFormsDisabled}
          label='Forever booking'
        />
        <Button disabled={isFormsDisabled} onClick={handleBookingDateOpen}>
          {bookedDays ?
            `Booked Days: ${dateToString(bookedDays.startDate)} - ${bookedDays?.endDate ? dateToString(bookedDays.endDate) : 'Forever'}` :
            'Choose Booking Dates'
          }
        </Button>
        <InputGroup 
          required
          disabled={isFormsDisabled}
          placeholder='Name'
          value={visitorName}
          onChange={handleNameChange}
        />
        <Button onClick={handlePaymentOpen} disabled={isFormsDisabled || !bookedDays}>
          {paidDays ?
            `Paid days: ${dateToString(paidDays.startDate)} - ${dateToString(paidDays.endDate)}` :
            'Add payment'
          }
        </Button>
        <Button type='submit' disabled={!bookedDays || !paidDays || !visitorName || !amount || isFormsDisabled}>
          Book
        </Button>
      </form>
      <Dialog
        title='Select dates for booking'
        isOpen={isBookingDatesOpen}
        onClose={handleBookingDatesClose}
        canOutsideClickClose={false}
        isCloseButtonShown={false}
      >
        {foreverBooking ?
          <DatePicker
            minDate={currentDay}
            maxDate={addYears(currentDay, 4)}
            onChange={handleForeverDateRangeChange}
          /> :
          <DateRangePicker
            contiguousCalendarMonths
            minDate={currentDay}
            maxDate={addYears(currentDay, 4)}
            shortcuts={false}
            onChange={
              ([startDate, endDate]) => startDate && endDate && handleFiniteDateRangeChange({ startDate, endDate })
            }
          />
        }
      </Dialog>
      <Dialog
        title='Add payment'
        isOpen={isPaymentOpen}
        onClose={handlePaymentClose}
        canOutsideClickClose={false}
        isCloseButtonShown={false}
      >
        {bookedDays &&
          <AddPayment
            unPaidDays={bookedDays}
            sendPayment={sendPayment}
            handlePaymentClose={handlePaymentClose}
          />
        }
      </Dialog>
    </div>
  )
}

export default BookPlace
