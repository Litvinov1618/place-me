import React, { useState } from 'react'
import { AnchorButton } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup'
import DatePicker from './DatePicker'
import { DateRange } from '@blueprintjs/datetime/lib/esm/common/dateRange'
import useBookingPlace from '../modules/useBookingPlace'
import { Classes } from '@blueprintjs/core/lib/esm/common'

interface BookingPlaceProps {
  placeId: string
  handleClose: () => void
}

const BookingPlace: React.FC<BookingPlaceProps> = ({ handleClose, placeId }) => {
  const { add } = useBookingPlace(placeId)

  const [dateRange, setDateRange] = useState<DateRange>([null, null])
  const handleDateRangeChange = (dateRange: DateRange) => {
    setDateRange(dateRange)
  }

  const [name, setName] = useState('')
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)

  const [amount, setAmount] = useState('')
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)

  const bookPlace = () => {
    add({ dateRange, name, amount: +amount })
      .then(() => handleClose())
      .catch(error => console.log(error))
  }

  return (
    <div>
      <DatePicker className={Classes.ELEVATION_1} shortcuts={false} onChange={handleDateRangeChange} />
      <InputGroup placeholder='Name' value={name} onChange={handleNameChange}></InputGroup>
      <InputGroup placeholder='Amount' value={amount} onChange={handleAmountChange}></InputGroup>
      <AnchorButton text='Book' onClick={bookPlace}></AnchorButton>
    </div>
  )
}

export default BookingPlace
