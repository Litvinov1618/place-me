import React from 'react'
import CustomDateRange from '../interfaces/CustomDateRange'
import FiniteDateRange from '../interfaces/FiniteDateRange'
import addYears from '../modules/addYears'
import calculateDefaultPaidDays from '../modules/calculateDefaultPaidDays'
import DatePicker from './DatePicker'
import DateRangePicker from './DateRangePicker'
import Dialog from './Dialog'

interface AddBookingDatesProps {
  foreverFlag: boolean
  setBookingDateRange: React.Dispatch<React.SetStateAction<CustomDateRange | undefined>>
  setPaidDays: React.Dispatch<React.SetStateAction<FiniteDateRange | undefined>>
  isBookingDatesOpen: boolean
  onBookingDatesClose: () => void
}

const AddBookingDates: React.FC<AddBookingDatesProps> = (
    { foreverFlag, setBookingDateRange, setPaidDays, isBookingDatesOpen, onBookingDatesClose }
  ) => {

  const currentDay = new Date()

  const onForeverDateRangeChange = (startDate: Date) => {
    const bookedDays = { startDate, endDate: null }
    setBookingDateRange(bookedDays)
    setPaidDays(calculateDefaultPaidDays(bookedDays))
    onBookingDatesClose()
  }

  const onFiniteDateRangeChange = (bookedDays: FiniteDateRange) => {
    if (bookedDays.startDate && bookedDays.endDate) {
      setBookingDateRange(bookedDays)
      setPaidDays(calculateDefaultPaidDays(bookedDays))
      onBookingDatesClose()
    }
  }

  return (
    <Dialog
      title='Select dates for booking'
      isOpen={isBookingDatesOpen}
      onClose={onBookingDatesClose}
      canOutsideClickClose={false}
      isCloseButtonShown={false}
    >
      {foreverFlag ?
        <DatePicker
          minDate={currentDay}
          maxDate={addYears(currentDay, 4)}
          onChange={onForeverDateRangeChange}
        /> :
        <DateRangePicker
          contiguousCalendarMonths
          minDate={currentDay}
          maxDate={addYears(currentDay, 4)}
          shortcuts={false}
          onChange={
            ([startDate, endDate]) => startDate && endDate && onFiniteDateRangeChange({ startDate, endDate })
          }
        />
      }
    </Dialog>
  )
}

export default AddBookingDates
