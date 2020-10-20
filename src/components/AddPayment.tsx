import React, { useState } from 'react'
import FiniteDateRange from '../interfaces/FiniteDateRange'
import addYears from '../modules/addYears'
import Button from './Button'
import DateRangePicker from './DateRangePicker'
import NumericInput from './NumericInput'

interface AddPaymentProps {
  onSubmit: (amount: number, paidDays: FiniteDateRange) => void
  defaultPaidDays: FiniteDateRange
  foreverFlag: boolean
  onPaymentComplete: () => void
}

const AddPayment: React.FC<AddPaymentProps> = ({ onPaymentComplete, defaultPaidDays, onSubmit, foreverFlag }) => {
  const [amount, setAmount] = useState<number>()
  const [paidDays, setPaidDays] = useState<FiniteDateRange>(() => defaultPaidDays)

  const onAmountChange = (value: number) => {
    if (isNaN(value)) setAmount(0)
    else setAmount(value)
  }

  const submitPayment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (amount && paidDays) onSubmit(amount, paidDays)
    onPaymentComplete()
  }

  const countDays = (startDate: number, endDate: number) => Math.round((endDate - startDate) / 864e5)
  const currentDay = new Date()

  return (
    <form onSubmit={submitPayment}>
      {paidDays &&
        <DateRangePicker
          defaultValue={[paidDays.startDate, paidDays.endDate]}
          minDate={paidDays.startDate}
          maxDate={foreverFlag ? addYears(currentDay, 2) : paidDays.endDate}
          onChange={
            ([startDate, endDate]) => startDate && endDate && setPaidDays({ startDate, endDate })
          }
          shortcuts={false}
        />
      }
      <div style={{ display: 'flex' }}>
        <NumericInput
          placeholder='Amount'
          value={amount}
          allowNumericCharactersOnly
          buttonPosition='none'
          onValueChange={onAmountChange}
          required
        />
        {paidDays &&
          <span>Paid days: {countDays(paidDays.startDate.getTime(), paidDays.endDate.getTime())}</span>
        }
      </div>
      <Button type='submit'>Add payment</Button>
    </form>
  )
}

export default AddPayment
