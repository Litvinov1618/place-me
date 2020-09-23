import React, { useState } from 'react'
import { Navbar } from '@blueprintjs/core/lib/esm/components/navbar/navbar'
import { NavbarGroup } from '@blueprintjs/core/lib/esm/components/navbar/navbarGroup'
import { NavbarHeading } from '@blueprintjs/core/lib/esm/components/navbar/navbarHeading'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { IPlaceCollection } from '../interfaces'
import { Dialog } from '@blueprintjs/core/lib/esm/components/dialog/dialog'
import usePlacesCollection from '../modules/usePlacesCollection'
import AddPlace from './AddPlace'
import PlaceCard from './PlaceCard'
import DatePicker from './DatePicker'
import { DateRange } from '@blueprintjs/datetime/lib/esm/common/dateRange'
import { NumericInput } from '@blueprintjs/core/lib/esm/components/forms/numericInput'
import formatDate from '../modules/formatDate'
import filterPlaces from '../modules/filterPlaces'

const Places: React.FC = () => {
  const { places } = usePlacesCollection()

  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false)
  const handleAddPlaceOpen = () => setIsAddPlaceOpen(true)
  const handleAddPlaceClose = () => setIsAddPlaceOpen(false)
  
  const [firstDay, setFirstDay] = useState<Date>()
  const [lastDay, setLastDay] = useState<Date>()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const handleDatePickerOpen = () => setIsDatePickerOpen(true)
  const handleDatePickerClose = () => setIsDatePickerOpen(false)
  const handleDatePickerChange = (date: DateRange) => {
    date[0] && setFirstDay(date[0])
    date[1] && setLastDay(date[1])
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
        <div>Seats: <NumericInput onValueChange={handleSeatsChange} value={seats} min={1} /></div>
      </div>
      {places
        .filter(place => filterPlaces(place.data(), seats))
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
        <Button onClick={handleDatePickerClose}>Choose</Button>
      </Dialog>
    </div>
  )
}

export default Places
