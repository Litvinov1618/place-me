import React, { useState } from 'react'
import { Navbar } from '@blueprintjs/core/lib/esm/components/navbar/navbar'
import { NavbarGroup } from '@blueprintjs/core/lib/esm/components/navbar/navbarGroup'
import { NavbarHeading } from '@blueprintjs/core/lib/esm/components/navbar/navbarHeading'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { Dialog } from '@blueprintjs/core/lib/esm/components/dialog/dialog'
import { NumericInput } from '@blueprintjs/core/lib/esm/components/forms/numericInput'
import AddPlace from './AddPlace'
import DatePicker from './DatePicker'
import usePlacesCollection from '../modules/usePlacesCollection'
import formatDate from '../modules/formatDate'
import { ButtonGroup } from '@blueprintjs/core'
import PlaceList from './PlaceList'
import { BookingDateRange } from '../interfaces'

const Places: React.FC = () => {
  const { places } = usePlacesCollection()

  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false)
  const handleAddPlaceOpen = () => setIsAddPlaceOpen(true)
  const handleAddPlaceClose = () => setIsAddPlaceOpen(false)

  const [dateRange, setDateRange] = useState<BookingDateRange>()

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const handleDatePickerOpen = () => setIsDatePickerOpen(true)
  const handleDatePickerClose = () => setIsDatePickerOpen(false)
  const handleDatePickerChange = (dateRange: BookingDateRange) => {
    setDateRange(dateRange)
    setShowResetButton(true)
    handleDatePickerClose()
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
          <Button onClick={handleAddPlaceOpen} minimal icon='add' />
        </NavbarGroup>
      </Navbar>
      <div>
        <ButtonGroup>
          <Button style={{ outline: 'none' }} onClick={handleDatePickerOpen}>
            {dateRange ?
              `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}` :
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
        canOutsideClickClose
        isCloseButtonShown
        isOpen={isAddPlaceOpen}
        onClose={handleAddPlaceClose}
      >
        <AddPlace handleClose={handleAddPlaceClose} />
      </Dialog>
      <Dialog
        title='Choose Date Range'
        canOutsideClickClose
        isCloseButtonShown
        isOpen={isDatePickerOpen}
        onClose={handleDatePickerClose}
      >
        <DatePicker
          allowSingleDayRange
          defaultValue={dateRange && [dateRange.startDate, dateRange.endDate]}
          shortcuts={false}
          onChange={
            ([startDate, endDate]) => startDate && endDate && handleDatePickerChange({ startDate, endDate})
          }
          minDate={new Date()}
          maxDate={new Date(Date.now() + 3e11)}
          contiguousCalendarMonths
        />
      </Dialog>
    </div>
  )
}

export default Places
