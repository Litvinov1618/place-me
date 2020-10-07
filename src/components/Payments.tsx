import React, { useState } from 'react'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { Card } from '@blueprintjs/core/lib/esm/components/card/card'
import { Navbar } from '@blueprintjs/core/lib/esm/components/navbar/navbar'
import { NavbarGroup } from '@blueprintjs/core/lib/esm/components/navbar/navbarGroup'
import { NavbarHeading } from '@blueprintjs/core/lib/esm/components/navbar/navbarHeading'
import dateToString from '../modules/dateToString'
import { FiniteDateRange, PaymentData, PaymentSnapshot } from '../interfaces'
import { Dialog } from '@blueprintjs/core/lib/esm/components/dialog/dialog'
import DateRangePicker from './DateRangePicker'
import { ButtonGroup } from '@blueprintjs/core'
import usePaymentsCollection from '../modules/usePaymentsCollection'

const Payments: React.FC = () => {
  const { payments } = usePaymentsCollection()

  const [dateRange, setDateRange] = useState<FiniteDateRange>()

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const handleDatePickerOpen = () => setIsDatePickerOpen(true)
  const handleDatePickerClose = () => setIsDatePickerOpen(false)
  const handleDatePickerChange = (dateRange: FiniteDateRange) => {
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

  const verifyPayments = (paymentData: PaymentData, dateRange?: FiniteDateRange) => {
    if (dateRange) {
      const { startDate, endDate } = dateRange
      const { bookingDate } = paymentData

      if (bookingDate.endDate) {
        if (
          endDate >= bookingDate.startDate.toDate() &&
          startDate <= bookingDate.endDate.toDate()
        ) {
          return true
        }
      } else if (bookingDate.startDate.toDate() < endDate) {
        return true
      }

      return false
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
        .map((payment) => {
          const { paymentDate, visitorName, placeName, amount, paidDays, bookingDate } = payment.data()
          return (
            <Card key={payment.id}>
              <p className='bp3-ui-text'>
                Payment Date: {dateToString(paymentDate.toDate())}
              </p>
              <p className='bp3-ui-text'>
                Amount: {amount} ₴
              </p>
              <p className='bp3-ui-text'>
                Name: {visitorName}
              </p>
              <p className='bp3-ui-text'>
                Place: {placeName}, {dateToString(bookingDate.startDate.toDate())} -&nbsp;
                {bookingDate.endDate ? dateToString(bookingDate.endDate!.toDate()) : 'Forever'}
              </p>
              <p>
                Paid days: {dateToString(paidDays.startDate.toDate())} - {dateToString(paidDays.endDate.toDate())}
              </p>
            </Card>
          )
        })
      }
      <Dialog
        title='Choose Date Range'
        isOpen={isDatePickerOpen}
        onClose={handleDatePickerClose}
      >
        <DateRangePicker
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
