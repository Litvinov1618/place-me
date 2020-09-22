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

const Places: React.FC = () => {
  const { places } = usePlacesCollection()

  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false)
  const handleAddPlaceOpen = () => setIsAddPlaceOpen(true)
  const handleAddPlaceClose = () => setIsAddPlaceOpen(false)

  const [dateRange, setDateRange] = useState<DateRange>([null, null])
  const [isDateRangePickerOpen, setIsDateRangePickerOpen] = useState(false)
  const handleDateRangePickerOpen = () => setIsDateRangePickerOpen(true)
  const handleDateRangePickerClose = () => setIsDateRangePickerOpen(false)
  const handleDateRangeChange = (date: DateRange) => setDateRange(date)

  return (
    <div>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>Places</NavbarHeading>
          <Button onClick={handleAddPlaceOpen} minimal icon='add' />
        </NavbarGroup>
      </Navbar>
      <div>
        <Button onClick={handleDateRangePickerOpen}>{dateRange[0] ? formatDate(dateRange[0]) : 'FirstDay'}</Button>
        <Button onClick={handleDateRangePickerOpen}>{dateRange[1] ? formatDate(dateRange[1]) : 'Last Day'}</Button>
        <div>Seats: <NumericInput defaultValue={'1'} min={1} /></div>
      </div>
      {places.map((place: IPlaceCollection) => <PlaceCard key={place.id} placeData={place.data()} placeId={place.id} />)}
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
        isOpen={isDateRangePickerOpen}
        onClose={handleDateRangePickerClose}
      >
        <DatePicker
          allowSingleDayRange
          shortcuts={false}
          onChange={handleDateRangeChange}
          minDate={new Date()}
          maxDate={new Date(Date.now() + 3e11)}
          contiguousCalendarMonths
        />
        <Button onClick={handleDateRangePickerClose}>Choose</Button>
      </Dialog>
    </div>
  )
}

export default Places
