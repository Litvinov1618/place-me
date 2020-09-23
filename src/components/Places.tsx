import React, { useState } from 'react'
import { Navbar } from '@blueprintjs/core/lib/esm/components/navbar/navbar'
import { NavbarGroup } from '@blueprintjs/core/lib/esm/components/navbar/navbarGroup'
import { NavbarHeading } from '@blueprintjs/core/lib/esm/components/navbar/navbarHeading'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { Dialog } from '@blueprintjs/core/lib/esm/components/dialog/dialog'
import { DateRange } from '@blueprintjs/datetime/lib/esm/common/dateRange'
import { NumericInput } from '@blueprintjs/core/lib/esm/components/forms/numericInput'
import { IPlaceCollection } from '../interfaces'
import AddPlace from './AddPlace'
import PlaceCard from './PlaceCard'
import DatePicker from './DatePicker'
import usePlacesCollection from '../modules/usePlacesCollection'
import formatDate from '../modules/formatDate'
import filterPlaces from '../modules/filterPlaces'

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
  const handleDatePickerChange = ([firstDate, lastDate]: DateRange) => {
    if (firstDate && lastDate) {
      setFirstDay(firstDate)
      setLastDay(lastDate)
      setShowResetButton(true)
      handleDatePickerClose()
    }
  }

  const [showResetButton, setShowResetButton] = useState(false)
  const resetFilters = () => {
    setFirstDay(null)
    setLastDay(null)
    setShowResetButton(false)
  }

  const [seats, setSeats] = useState('1')
  const handleSeatsChange = (v: number , value: string) => setSeats(value)

  return (
    <div>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>Places</NavbarHeading>
          <Button onClick={handleAddPlaceOpen} minimal icon='add' />
        </NavbarGroup>
      </Navbar>
      <div>
        <Button onClick={handleDatePickerOpen}>{firstDay ? formatDate(firstDay) : 'FirstDay'}</Button>
        <Button onClick={handleDatePickerOpen}>{lastDay ? formatDate(lastDay) : 'Last Day'}</Button>
        {showResetButton && <Button onClick={resetFilters} >Reset filters</Button>}
        <div>Seats: <NumericInput onValueChange={handleSeatsChange} value={seats} min={1} /></div>
      </div>
      {places
        .filter(place => filterPlaces(place.data(), seats, firstDay, lastDay))
        .map((place: IPlaceCollection) => <PlaceCard key={place.id} placeData={place.data()} placeId={place.id} />)
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
