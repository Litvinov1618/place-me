import React, { useState } from 'react'
import { Navbar } from '@blueprintjs/core/lib/esm/components/navbar/navbar'
import { NavbarGroup } from '@blueprintjs/core/lib/esm/components/navbar/navbarGroup'
import { NavbarHeading } from '@blueprintjs/core/lib/esm/components/navbar/navbarHeading'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { Dialog } from '@blueprintjs/core/lib/esm/components/dialog/dialog'
import { NumericInput } from '@blueprintjs/core/lib/esm/components/forms/numericInput'
import { IPlaceSnapshot } from '../interfaces'
import AddPlace from './AddPlace'
import PlaceCard from './PlaceCard'
import DatePicker from './DatePicker'
import usePlacesCollection from '../modules/usePlacesCollection'
import formatDate from '../modules/formatDate'
import verifyPlace from '../modules/verifyPlace'
import { ButtonGroup } from '@blueprintjs/core'
import { DateRange } from '@blueprintjs/datetime/lib/esm/common/dateRange'

const Places: React.FC = () => {
  const { places } = usePlacesCollection()

  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false)
  const handleAddPlaceOpen = () => setIsAddPlaceOpen(true)
  const handleAddPlaceClose = () => setIsAddPlaceOpen(false)

  const [firstDay, setFirstDay] = useState<Date | null>(null)
  const [lastDay, setLastDay] = useState<Date | null>(null)

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const handleDatePickerOpen = () => setIsDatePickerOpen(true)
  const handleDatePickerClose = () => setIsDatePickerOpen(false)
  const handleDatePickerChange = ([firstDay, lastDay]: DateRange) => {
    setFirstDay(firstDay)
    setLastDay(lastDay)
    setShowResetButton(true)
    handleDatePickerClose()
  }

  const [showResetButton, setShowResetButton] = useState(false)
  const resetFilters = () => {
    setFirstDay(null)
    setLastDay(null)
    setShowResetButton(false)
  }

  const [seats, setSeats] = useState(1)
  const handleSeatsChange = (value: number) => setSeats(value)

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
          <Button style={{outline: 'none'}} onClick={handleDatePickerOpen}>
            {firstDay ? formatDate(firstDay) : 'FirstDay'} - {lastDay ? formatDate(lastDay) : 'Last Day'}
          </Button>
          {showResetButton && <Button style={{outline: 'none'}} onClick={resetFilters} >Reset filters</Button>}
        </ButtonGroup>
        <div>Seats: <NumericInput onValueChange={handleSeatsChange} value={seats} min={1} /></div>
      </div>
      {places
        .filter(place => verifyPlace(place.data(), +seats, firstDay, lastDay))
        .map((place: IPlaceSnapshot) => <PlaceCard key={place.id} placeData={place.data()} placeId={place.id} />)
      }
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
          defaultValue={[firstDay, lastDay]}
          shortcuts={false}
          onChange={handleDatePickerChange}
          minDate={new Date()}
          maxDate={new Date(Date.now() + 3e11)}
          contiguousCalendarMonths
        />
      </Dialog>
    </div>
  )
}

export default Places
