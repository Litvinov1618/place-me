import React, { useState } from 'react'
import AddPlace from './AddPlace'
import DateRangePicker from './DateRangePicker'
import usePlacesCollection from '../modules/usePlacesCollection'
import dateToString from '../modules/dateToString'
import PlaceList from './PlaceList'
import FiniteDateRange from '../interfaces/FiniteDateRange'
import Navbar from './Navbar'
import NavbarHeading from './NavbarHeading'
import NavbarGroup from './NavbarGroup'
import Button from './Button'
import ButtonGroup from './ButtonGroup'
import NumericInput from './NumericInput'
import Dialog from './Dialog'

const Places: React.FC = () => {
  const { places } = usePlacesCollection()

  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false)
  const onAddPlaceOpen = () => setIsAddPlaceOpen(true)
  const onAddPlaceClose = () => setIsAddPlaceOpen(false)

  const [dateRange, setDateRange] = useState<FiniteDateRange>()

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const onDatePickerOpen = () => setIsDatePickerOpen(true)
  const onDatePickerClose = () => setIsDatePickerOpen(false)
  const onDatePickerChange = (dateRange: FiniteDateRange) => {
    setDateRange(dateRange)
    setShowResetButton(true)
    onDatePickerClose()
  }

  const [showResetButton, setShowResetButton] = useState(false)
  const resetFilters = () => {
    setDateRange(undefined)
    setSeats(1)
    setShowResetButton(false)
  }

  const [seats, setSeats] = useState(1)

  return (
    <div>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>Places</NavbarHeading>
          <Button onClick={onAddPlaceOpen} minimal icon='add' />
        </NavbarGroup>
      </Navbar>
      <div>
        <ButtonGroup>
          <Button style={{ outline: 'none' }} onClick={onDatePickerOpen}>
            {dateRange ?
              `${dateToString(dateRange.startDate)} - ${dateToString(dateRange.endDate)}` :
              'FirstDay - Last Day'
            }
          </Button>
          {showResetButton && <Button style={{ outline: 'none' }} onClick={resetFilters}>Reset filters</Button>}
        </ButtonGroup>
        <div>Seats: <NumericInput onValueChange={setSeats} value={seats} min={1} /></div>
      </div>
      <PlaceList places={places} filters={{ minSeats: seats, dateRange: dateRange }} />
      <Dialog
        title='Add Place'
        isOpen={isAddPlaceOpen}
        onClose={onAddPlaceClose}
      >
        <AddPlace onClose={onAddPlaceClose} />
      </Dialog>
      <Dialog
        title='Choose Date Range'
        isOpen={isDatePickerOpen}
        onClose={onDatePickerClose}
      >
        <DateRangePicker
          allowSingleDayRange
          defaultValue={dateRange && [dateRange.startDate, dateRange.endDate]}
          shortcuts={false}
          onChange={([startDate, endDate]) => startDate && endDate && onDatePickerChange({ startDate, endDate})}
          minDate={new Date()}
          maxDate={new Date(Date.now() + 3e11)}
          contiguousCalendarMonths
        />
      </Dialog>
    </div>
  )
}

export default Places
