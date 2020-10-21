import React, { useState } from 'react'
import dateToString from '../modules/dateToString'
import DateRangePicker from './DateRangePicker'
import usePaymentsCollection from '../modules/usePaymentsCollection'
import FiniteDateRange from '../interfaces/FiniteDateRange'
import PaymentSnapshot from '../interfaces/PaymentSnapshot'
import PaymentData from '../interfaces/PaymentData'
import Navbar from './Navbar'
import NavbarGroup from './NavbarGroup'
import NavbarHeading from './NavbarHeading'
import ButtonGroup from './ButtonGroup'
import Button from './Button'
import Card from './Card'
import Dialog from './Dialog'

const PaymentsPage: React.FC = () => {
  const { payments } = usePaymentsCollection()

  const [dateRange, setDateRange] = useState<FiniteDateRange>()

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const onDatePickerOpen = () => setIsDatePickerOpen(true)
  const onDatePickerClose = () => setIsDatePickerOpen(false)
  const onDatePickerChange = (dateRange: FiniteDateRange) => {
    setDateRange(dateRange)
    setShowResetButton(true)
    onDatePickerClose()
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
        <Button onClick={onDatePickerOpen}>
          {dateRange ?
            `${dateToString(dateRange.startDate)} - ${dateToString(dateRange.endDate)}` :
            'FirstDay - Last Day'
          }
        </Button>
        {showResetButton && <Button onClick={resetFilters}>Reset filters</Button>}
      </ButtonGroup>
      <h3 className='bp3-heading'>Total: {countTotal(payments)} ₴</h3>
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
        onClose={onDatePickerClose}
      >
        <DateRangePicker
          allowSingleDayRange
          defaultValue={dateRange && [dateRange.startDate, dateRange.endDate]}
          shortcuts={false}
          onChange={([startDate, endDate]) => startDate && endDate && onDatePickerChange({ startDate, endDate})}
          maxDate={new Date(Date.now() + 3e11)}
          contiguousCalendarMonths
        />
      </Dialog>
    </div>
  )
}

export default PaymentsPage
