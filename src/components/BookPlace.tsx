import React, { useState } from 'react'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup'
import DateRangePicker from './DateRangePicker'
import useBookingPlace from '../modules/useBookingPlace'
import { FiniteDateRange, BookingPlaceData } from '../interfaces'
import Timestamp from '../modules/timestamp'
import { Dialog } from '@blueprintjs/core/lib/esm/components/dialog/dialog'
import { RadioGroup } from '@blueprintjs/core/lib/esm/components/forms/radioGroup'
import { Radio } from '@blueprintjs/core/lib/esm/components/forms/controls'
import { DatePicker } from '@blueprintjs/datetime/lib/esm/datePicker'
import { NumericInput } from '@blueprintjs/core'
import AppToaster from '../modules/toaster'
import dateToString from '../modules/dateToString'

interface BookPlaceProps {
  placeId: string
  handleClose: () => void
  placeBookings: BookingPlaceData[]
  placeName: string 
}

const BookPlace: React.FC<BookPlaceProps> = ({ handleClose, placeId, placeBookings, placeName }) => {
  const { book } = useBookingPlace(placeId)

  const [dateRangeType, setDateRangeType] = useState<'range' | 'endless'>('range')
  const handleDateRangeTypeChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === 'range' || event.currentTarget.value === 'endless') {
      setDateRangeType(event.currentTarget.value)
    }
  } 

  const [dateRange, setDateRange] = useState<{ startDate: Date, endDate: Date | null }>()
  const handleFinalDateRangeChange = (dateRange: FiniteDateRange) => {
    setDateRange(dateRange)
    setPaidDays(dateRange)
  }

  const handleEndlessDateRangeChange = (startDate: Date) => {
    setDateRange({ startDate, endDate: null })
    setPaidDays({ startDate, endDate: startDate })
  }

  const [visitorName, setVisitorName] = useState<string>()
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setVisitorName(event.target.value)

  const [paidDays, setPaidDays] = useState<FiniteDateRange>()
  const handlePaidDaysChange = (dateRange: FiniteDateRange) => setPaidDays(dateRange)

  const [amount, setAmount] = useState<number>()
  const handleAmountChange = (value: number) => setAmount(value)

  const [isBookingDatesOpen, setIsBookingDatesOpen] = useState(false)
  const handleBookingDateOpen = () => setIsBookingDatesOpen(true)
  const handleBookingDatesClose = () => setIsBookingDatesOpen(false)

  const [isPaidDaysOpen, setIsPaidDays] = useState(false)
  const handlePaidDaysOpen = () => setIsPaidDays(true)
  const handlePaidDaysClose = () => setIsPaidDays(false)

  const [isFormsDisabled, setIsFormsDisabled] = useState(false)

  const bookPlace = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsFormsDisabled(true)

    if (dateRange && paidDays && visitorName && amount) {
      book(
        {
          startDate: Timestamp.fromDate(dateRange.startDate),
          endDate: dateRange.endDate ? Timestamp.fromDate(dateRange.endDate) : null,
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

  return (
    <div>
      <form onSubmit={bookPlace}>
        <RadioGroup
          onChange={handleDateRangeTypeChange}
          selectedValue={dateRangeType}
          label='Booking type:'
          disabled={isFormsDisabled}
        >
          <Radio value='range' label='Range booking' />
          <Radio value='endless' label='Endless booking' />
        </RadioGroup>
        <Button disabled={isFormsDisabled} onClick={handleBookingDateOpen}>
          {dateRange ?
            `${dateToString(dateRange.startDate)} - ${dateRange?.endDate ? dateToString(dateRange.endDate) : 'Forever'}` :
            'Choose Booking Dates'
          }
        </Button>
        <InputGroup disabled={isFormsDisabled} placeholder='Name' value={visitorName} onChange={handleNameChange} />
        <NumericInput
          disabled={isFormsDisabled}
          placeholder='Amount'
          value={amount}
          buttonPosition='none'
          onValueChange={handleAmountChange} 
        />
        <Button onClick={handlePaidDaysOpen} disabled={!dateRange || isFormsDisabled}>
          {paidDays ? `${dateToString(paidDays.startDate)} - ${dateToString(paidDays.endDate)}` : 'Choose paid days'}
        </Button>
        <br/>
        <Button type='submit' disabled={!dateRange || !paidDays || !visitorName || !amount || isFormsDisabled}>
          Book
        </Button>
      </form>
      <Dialog
        title='Select dates for booking'
        isCloseButtonShown
        canOutsideClickClose
        isOpen={isBookingDatesOpen}
        onClose={handleBookingDatesClose}
      >
        {dateRangeType === 'range' ?
          <DateRangePicker
            contiguousCalendarMonths
            minDate={new Date()}
            maxDate={new Date(Date.now() + 3e11)}
            shortcuts={false}
            onChange={
              ([startDate, endDate]) => startDate && endDate && handleFinalDateRangeChange({ startDate, endDate })
            }
          /> :
          <DatePicker
            minDate={new Date()}
            maxDate={new Date(Date.now() + 3e11)}
            onChange={handleEndlessDateRangeChange}
          />
        }
        <Button onClick={handleBookingDatesClose}>Choose</Button>
      </Dialog>
      <Dialog
        title='Select dates for payment'
        isCloseButtonShown
        canOutsideClickClose
        isOpen={isPaidDaysOpen}
        onClose={handlePaidDaysClose}
      >
        <DateRangePicker
          defaultValue={dateRange && [dateRange.startDate, dateRange.endDate]}
          minDate={dateRange && dateRange.startDate}
          maxDate={dateRange?.endDate ? dateRange.endDate : undefined}
          onChange={([startDate, endDate]) => startDate && endDate && handlePaidDaysChange({ startDate, endDate })}
          shortcuts={false}
        />
        <Button onClick={handlePaidDaysClose}>Choose</Button>
      </Dialog>
    </div>
  )
}

export default BookPlace
