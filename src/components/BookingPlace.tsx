import React, { useState } from 'react'
import { AnchorButton } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup'
import DatePicker from './DatePicker'
import { DateRange } from '@blueprintjs/datetime/lib/esm/common/dateRange'

interface BookingPlaceProps {
  placeId: string
  handleClose: () => void
}

const BookingPlace: React.FC<BookingPlaceProps> = ({ handleClose }) => {
  const reservePlace = () => {
    handleClose()
  }

  const [, setDateRange] = useState<DateRange>()
  const handleDateRangeChange = (dateRange: DateRange) => {
    setDateRange(dateRange)
  }

  return (
    <div>
      <DatePicker shortcuts={false} onChange={handleDateRangeChange} />
      <InputGroup placeholder='Name'></InputGroup>
      <InputGroup placeholder='Amount'></InputGroup>
      <AnchorButton text='Reserve' onClick={reservePlace}></AnchorButton>
    </div>
  )
}

export default BookingPlace
