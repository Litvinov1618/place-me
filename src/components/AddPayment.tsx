import React, { useEffect, useState } from 'react'
import CustomDateRange from '../interfaces/CustomDateRange'
import FiniteDateRange from '../interfaces/FiniteDateRange'
import addYears from '../modules/addYears'
import Button from './Button'
import DateRangePicker from './DateRangePicker'
import NumericInput from './NumericInput'

interface AddPaymentProps {
  getPaymentInfo: (amount: number, paidDays: FiniteDateRange) => void
  unpaidDays: CustomDateRange
  onPaymentComplete: () => void
}

const AddPayment: React.FC<AddPaymentProps> = ({ onPaymentComplete, unpaidDays, getPaymentInfo }) => {
  const [amount, setAmount] = useState<number>()
  const [paidDays, setPaidDays] = useState<FiniteDateRange>()

  const setDefaultPaidDays = (unpaidDays: CustomDateRange) => {
    if (!unpaidDays) return
    if (unpaidDays?.endDate) {
      setPaidDays({ startDate: unpaidDays.startDate, endDate: unpaidDays.endDate })
      return
    }

    const date = unpaidDays!.startDate
    const lastDayOfMonth = (year: number, month: number) => new Date(year, month + 1, 0)
    const lastDayOfNextMonth = lastDayOfMonth(date.getFullYear(), date.getMonth() + 1)

    if (
      lastDayOfMonth(date.getFullYear(), date.getMonth()).getDate() === date.getDate() ||
      date.getDate() > lastDayOfNextMonth.getDate()
    ) setPaidDays({ startDate: unpaidDays!.startDate, endDate: lastDayOfNextMonth })
    else {
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
      setPaidDays({ startDate: unpaidDays!.startDate, endDate })
    }
  }

  useEffect(() => {
    setDefaultPaidDays(unpaidDays)
  }, [unpaidDays])

  const onAmountChange = (value: number) => {
    if (isNaN(value)) setAmount(0)
    else setAmount(value)
  }

  const submitPayment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (amount && paidDays) getPaymentInfo(amount, paidDays)
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
        maxDate={unpaidDays?.endDate || addYears(currentDay, 2)}
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
