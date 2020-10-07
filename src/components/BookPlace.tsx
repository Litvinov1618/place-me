import React, { useState } from 'react'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup'
import { Dialog } from '@blueprintjs/core/lib/esm/components/dialog/dialog'
import { NumericInput } from '@blueprintjs/core/lib/esm/components/forms/numericInput'
import DateRangePicker from './DateRangePicker'
import useBookingPlace from '../modules/useBookingPlace'
import { FiniteDateRange, BookingPlaceData } from '../interfaces'
import Timestamp from '../modules/timestamp'
import AppToaster from '../modules/toaster'
import dateToString from '../modules/dateToString'
import DatePicker from './DatePicker'
import { Checkbox } from '@blueprintjs/core/lib/esm/components/forms/controls'

type CustomDateRange = { startDate: Date, endDate: Date | null } | null

interface BookPlaceProps {
  placeId: string
  handleClose: () => void
  placeBookings: BookingPlaceData[]
  placeName: string 
}

const BookPlace: React.FC<BookPlaceProps> = ({ handleClose, placeId, placeBookings, placeName }) => {
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
      .catch((error: Error) => {
        AppToaster.show({ message: error.message, intent: 'danger' })
        setIsFormsDisabled(false)
      })
    }
  }

  // Working with dates
  const [bookedDays, setBookedDays] = useState<CustomDateRange>(null)
  const [paidDays, setPaidDays] = useState<FiniteDateRange | null>(null)
  const currentDay = new Date()

  const addYears = (date: Date, years: number) => {
    const result = new Date(date)
    result.setFullYear(result.getFullYear() + years)
    return result
  }

  const [foreverBooking, setForeverBooking] = useState(false)
  const handleForeverBooking = () => {
    setForeverBooking(!foreverBooking)
    setBookedDays(null)
    setPaidDays(null)
  }

  const setLastPaidDay = (date: Date) => {
    const lastDayOfMonth = (year: number, month: number) => new Date(year, month + 1, 0)
    const lastDayOfNextMonth = lastDayOfMonth(date.getFullYear(), date.getMonth() + 1)

    if (
      lastDayOfMonth(date.getFullYear(), date.getMonth()).getDate() === date.getDate() ||
      date.getDate() > lastDayOfNextMonth.getDate()
    ) return lastDayOfNextMonth
    else return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
  }

  const handleEndlessDateRangeChange = (startDate: Date) => {
    setBookedDays({ startDate, endDate: null })
    setPaidDays({ startDate, endDate: setLastPaidDay(startDate) })
  }

  const handleFinalDateRangeChange = (bookedDays: FiniteDateRange) => {
    setBookedDays(bookedDays)
    setPaidDays(bookedDays)
  }

  // Getting info from inputs
  const [visitorName, setVisitorName] = useState<string>('')
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setVisitorName(event.target.value)

  const [amount, setAmount] = useState<number>()
  const handleAmountChange = (value: number) => {
    if (isNaN(value)) setAmount(0)
    else setAmount(value)
  }

  const [isFormsDisabled, setIsFormsDisabled] = useState(false)

  // Managing modal windows
  const [isBookingDatesOpen, setIsBookingDatesOpen] = useState(false)
  const handleBookingDateOpen = () => setIsBookingDatesOpen(true)
  const handleBookingDatesClose = () => setIsBookingDatesOpen(false)

  const [isPaidDaysOpen, setIsPaidDaysOpen] = useState(false)
  const handlePaidDaysOpen = () => setIsPaidDaysOpen(true)
  const handlePaidDaysClose = () => setIsPaidDaysOpen(false)

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
            `${dateToString(bookedDays.startDate)} - ${bookedDays?.endDate ? dateToString(bookedDays.endDate) : 'Forever'}` :
            'Choose Booking Dates'
          }
        </Button>
        <InputGroup disabled={isFormsDisabled} placeholder='Name' value={visitorName} onChange={handleNameChange} />
        <NumericInput
          disabled={isFormsDisabled}
          placeholder='Amount'
          value={amount}
          allowNumericCharactersOnly
          buttonPosition='none'
          onValueChange={(value) => handleAmountChange(value) }
        />
        <Button onClick={handlePaidDaysOpen} disabled={!bookedDays || isFormsDisabled}>
          {paidDays ? `${dateToString(paidDays.startDate)} - ${dateToString(paidDays.endDate)}` : 'Choose paid days'}
        </Button>
        <br/>
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
            onChange={handleEndlessDateRangeChange}
          /> :
          <DateRangePicker
            contiguousCalendarMonths
            minDate={currentDay}
            maxDate={addYears(currentDay, 4)}
            shortcuts={false}
            onChange={
              ([startDate, endDate]) => startDate && endDate && handleFinalDateRangeChange({ startDate, endDate })
            }
          />
        }
        <Button onClick={handleBookingDatesClose}>Choose</Button>
      </Dialog>
      <Dialog
        title='Select dates for payment'
        isOpen={isPaidDaysOpen}
        onClose={handlePaidDaysClose}
        canOutsideClickClose={false}
        isCloseButtonShown={false}
      >
        <DateRangePicker
          defaultValue={paidDays ? [paidDays.startDate, paidDays.endDate] : undefined}
          minDate={paidDays?.startDate}
          maxDate={bookedDays?.endDate ? bookedDays.endDate : addYears(currentDay, 4)}
          onChange={([startDate, endDate]) => startDate && endDate && setPaidDays({ startDate, endDate })}
          shortcuts={false}
        />
        <Button onClick={handlePaidDaysClose}>Choose</Button>
      </Dialog>
    </div>
  )
}

export default BookPlace
