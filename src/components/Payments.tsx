import React, { useState } from 'react'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { Card } from '@blueprintjs/core/lib/esm/components/card/card'
import { Navbar } from '@blueprintjs/core/lib/esm/components/navbar/navbar'
import { NavbarGroup } from '@blueprintjs/core/lib/esm/components/navbar/navbarGroup'
import { NavbarHeading } from '@blueprintjs/core/lib/esm/components/navbar/navbarHeading'
import dateToString from '../modules/dateToString'
import { BookingDateRange, PaymentData } from '../interfaces'
import { Dialog } from '@blueprintjs/core/lib/esm/components/dialog/dialog'
import DatePicker from './DatePicker'
import { ButtonGroup } from '@blueprintjs/core'

const verifyPayments = (payment: PaymentData, dateRange?: {startDate: Date, endDate: Date}) => {
  if (dateRange) {
    const { startDate, endDate } = dateRange

    if (
      startDate.getTime() <= +payment.book.bookingDate.lastDate && 
      endDate.getTime() >= +payment.book.bookingDate.firstDate
    ) {
      return false
    }
  }

  return true
}

const countTotal = (payments: PaymentData[]) => {
  let total = 0
  for (let payment of payments) {
    total += payment.amount
  }

  return total
}

const paymentsData = [
  {
    paymentDate: new Date('2020-09-25'),
    name: 'Alex',
    amount: 600,
    book: {
      placeName: 'P1',
      bookingDate: {
        firstDate: new Date('2020-09-25'),
        lastDate: new Date('2020-09-26')
      }
    }
  },
  {
    paymentDate: new Date('2020-09-27'),
    name: 'Randy',
    amount: 900,
    book: {
      placeName: 'P2',
      bookingDate: {
        firstDate: new Date('2020-09-27'),
        lastDate: new Date('2020-09-29')
      }
    }
  }
]

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<PaymentData[]>([])

  setTimeout(() => setPayments(paymentsData), 1000)

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
        .filter(payment => verifyPayments(payment, dateRange))
        .map(({ paymentDate, amount, name, book }) => <Card>
            <p className='bp3-ui-text'>
              Date: {dateToString(paymentDate)}
            </p>
            <p className='bp3-ui-text'>
              Amount: {amount} ₴
            </p>
            <p className='bp3-ui-text'>
              Name: {name}
            </p>
            <p className='bp3-ui-text'>
              Place: '{book.placeName}', {dateToString(book.bookingDate.firstDate)} - {dateToString(book.bookingDate.lastDate)}
            </p>
          </Card>
        )
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
