import React, { useState } from 'react'
import { AnchorButton } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup'
import DatePicker from './DatePicker'
import { DateRange } from '@blueprintjs/datetime/lib/esm/common/dateRange'
import useBookingPlace from '../modules/useBookingPlace'
import { FiniteDateRange, BookingPlaceData } from '../interfaces'
import Timestamp from '../modules/timestamp'

interface BookPlaceProps {
  placeId: string
  handleClose: () => void
  placeBookings: BookingPlaceData[]
  placeName: string 
}

const BookPlace: React.FC<BookPlaceProps> = ({ handleClose, placeId, placeBookings, placeName }) => {
  const { book } = useBookingPlace(placeId)

  const [dateRange, setDateRange] = useState<DateRange>([null, null])
  const handleDateRangeChange = (dateRange: DateRange) => setDateRange(dateRange)

  const [visitorName, setVisitorName] = useState('')
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setVisitorName(event.target.value)

  const [paidDays, setPaidDays] = useState<FiniteDateRange>()
  const handlePaidDaysChange = (dateRange: FiniteDateRange) => setPaidDays(dateRange)

  const [amount, setAmount] = useState('')
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)

  const bookPlace = () => {
    const [firstDay, lastDay] = dateRange
    if (firstDay && paidDays) {
      book(
        {
          startDate: Timestamp.fromDate(firstDay),
          endDate: lastDay ? Timestamp.fromDate(lastDay) : null,
          visitorName,
          placeName,
          amount: +amount,
          paidDays: {
            startDate: Timestamp.fromDate(paidDays.startDate),
            endDate: Timestamp.fromDate(paidDays.endDate)
          }
        }, placeBookings
      )
        .then(handleClose)
        .catch(error => console.log(error))
    }
  }

  return (
    <div>
      <DatePicker
        contiguousCalendarMonths
        minDate={new Date()}
        maxDate={new Date(Date.now() + 3e11)}
        shortcuts={false}
        onChange={handleDateRangeChange} 
      />
      <InputGroup placeholder='Name' value={visitorName} onChange={handleNameChange}></InputGroup>
      <InputGroup placeholder='Amount' value={amount} onChange={handleAmountChange}></InputGroup>
      <span>Paid days: </span>
      <DatePicker
        minDate={dateRange[0] ? dateRange[0] : undefined}
        maxDate={dateRange[1] ? dateRange[1] : undefined}
        onChange={([startDate, endDate]) => startDate && endDate && handlePaidDaysChange({ startDate, endDate })}
        shortcuts={false}
      />
      <AnchorButton text='Book' onClick={bookPlace}></AnchorButton>
    </div>
  )
}

export default BookPlace
