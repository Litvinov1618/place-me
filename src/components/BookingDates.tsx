import React, { useState } from 'react'
import addYears from '../modules/addYears'
import DatePicker from './DatePicker'
import DateRangePicker from './DateRangePicker'
import Dialog from './Dialog'

const BookingDates: React.FC = () => {
  const currentDay = new Date()
  const [isBookingDatesOpen, setIsBookingDatesOpen] = useState(false)


  return (
    <span>1</span>
    // <Dialog
    //   title='Select dates for booking'
    //   isOpen={isBookingDatesOpen}
    //   onClose={onBookingDatesClose}
    //   canOutsideClickClose={false}
    //   isCloseButtonShown={false}
    // >
    //   {foreverBooking ?
    //     <DatePicker
    //       minDate={currentDay}
    //       maxDate={addYears(currentDay, 4)}
    //       onChange={onForeverDateRangeChange}
    //     /> :
    //     <DateRangePicker
    //       contiguousCalendarMonths
    //       minDate={currentDay}
    //       maxDate={addYears(currentDay, 4)}
    //       shortcuts={false}
    //       onChange={
    //         ([startDate, endDate]) => startDate && endDate && onFiniteDateRangeChange({ startDate, endDate })
    //       }
    //     />
    //   }
    // </Dialog>
  )
}

export default BookingDates
