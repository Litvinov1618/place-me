import React, { useState } from 'react'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { Card } from '@blueprintjs/core/lib/esm/components/card/card'
import { Navbar } from '@blueprintjs/core/lib/esm/components/navbar/navbar'
import { NavbarGroup } from '@blueprintjs/core/lib/esm/components/navbar/navbarGroup'
import { NavbarHeading } from '@blueprintjs/core/lib/esm/components/navbar/navbarHeading'
import dateToString from '../modules/dateToString'
import { BookingDateRange, PaymentData, PaymentSnapshot } from '../interfaces'
import { Dialog } from '@blueprintjs/core/lib/esm/components/dialog/dialog'
import DatePicker from './DatePicker'
import { ButtonGroup } from '@blueprintjs/core'
import usePaymentsCollection from '../modules/usePaymentsCollection'

const Payments: React.FC = () => {
  const { payments } = usePaymentsCollection()

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
    setShowResetButton(false)
  }

  const countTotal = (payments: PaymentSnapshot[]) => {
    payments = payments.filter(payment => verifyPayments(payment.data(), dateRange))
  
    let total = 0
    for (let payment of payments) {
      total += payment.data().amount
    }
  
    return total
  }

  const verifyPayments = (paymentData: PaymentData, dateRange?: {startDate: Date, endDate: Date}) => {
    if (dateRange) {
      const { startDate, endDate } = dateRange
  
      if (
        startDate <= paymentData.bookingDate.endDate.toDate() && 
        endDate >= paymentData.bookingDate.startDate.toDate()
      ) {
        return false
      }
    }
  
    return true
  }

  return (
    <div>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>Payments</NavbarHeading>
        </NavbarGroup>
      </Navbar>
      <ButtonGroup>
        <Button onClick={handleDatePickerOpen}>
          {dateRange ?
            `${dateToString(dateRange.startDate)} - ${dateToString(dateRange.endDate)}` :
            'FirstDay - Last Day'
          }
        </Button>
        {showResetButton && <Button onClick={resetFilters}>Reset filters</Button>}
      </ButtonGroup>
      <h3 className='bp3-heading'>Total: {countTotal(payments)}</h3>
      {payments
        .filter(payment => verifyPayments(payment.data(), dateRange))
        .map((payment) => (
          <Card key={payment.id}>
            <p className='bp3-ui-text'>
              Payment Date: {dateToString(payment.data().paymentDate.toDate())}
            </p>
            <p className='bp3-ui-text'>
              Amount: {payment.data().amount} ₴
            </p>
            <p className='bp3-ui-text'>
              Name: {payment.data().visitorName}
            </p>
            <p className='bp3-ui-text'>
              Place: {payment.data().placeName} {dateToString(payment.data().bookingDate.startDate.toDate())} - {dateToString(payment.data().bookingDate.endDate.toDate())}
            </p>
          </Card>
        ))
      }
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
          onChange={([startDate, endDate]) => startDate && endDate && handleDatePickerChange({ startDate, endDate})}
          maxDate={new Date(Date.now() + 3e11)}
          contiguousCalendarMonths
        />
      </Dialog>
    </div>
  )
}

export default Payments
