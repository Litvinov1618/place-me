import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { NumericInput } from '@blueprintjs/core/lib/esm/components/forms/numericInput'
import { DateRangePicker } from '@blueprintjs/datetime/lib/esm/dateRangePicker'
import React, { useEffect, useState } from 'react'
import { CustomDateRange, FiniteDateRange } from '../interfaces'
import addYears from '../modules/addYears'

interface AddPaymentProps {
  sendPayment: (amount: number, paidDays: FiniteDateRange) => void
  unPaidDays: CustomDateRange
  handlePaymentClose: () => void
}

const AddPayment: React.FC<AddPaymentProps> = ({ handlePaymentClose, unPaidDays, sendPayment }) => {
  const [amount, setAmount] = useState<number>()
  const [paidDays, setPaidDays] = useState<FiniteDateRange>()

  const checkDefaultPaidDaysValue = (unPaidDays: CustomDateRange) => {
    if (!unPaidDays) return
    if (unPaidDays?.endDate) {
      setPaidDays({ startDate: unPaidDays.startDate, endDate: unPaidDays.endDate })
      return
    }

    const date = unPaidDays!.startDate
    const lastDayOfMonth = (year: number, month: number) => new Date(year, month + 1, 0)
    const lastDayOfNextMonth = lastDayOfMonth(date.getFullYear(), date.getMonth() + 1)

    if (
      lastDayOfMonth(date.getFullYear(), date.getMonth()).getDate() === date.getDate() ||
      date.getDate() > lastDayOfNextMonth.getDate()
    ) setPaidDays({ startDate: unPaidDays!.startDate, endDate: lastDayOfNextMonth })
    else {
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
      setPaidDays({ startDate: unPaidDays!.startDate, endDate })
    }
  }

  const [isFormsDisabled, setIsFormsDisabled] = useState(false)

  useEffect(() => {
    checkDefaultPaidDaysValue(unPaidDays)
  }, [unPaidDays])

  const handleAmountChange = (value: number) => {
    if (isNaN(value)) setAmount(0)
    else setAmount(value)
  }

  const submitPayment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsFormsDisabled(true)

    if (amount && paidDays) sendPayment(amount, paidDays)
    setIsFormsDisabled(false)
    handlePaymentClose()
  }

  const countDays = (endDate: number, startDate: number) => Math.round((endDate - startDate) / 864e5)
  const currentDay = new Date()

  return (
    <form onSubmit={submitPayment}>
      <NumericInput
        disabled={isFormsDisabled}
        placeholder='Amount'
        value={amount}
        allowNumericCharactersOnly
        buttonPosition='none'
        onValueChange={handleAmountChange}
        required
      />
      <span>Paid days: {paidDays && countDays(paidDays.endDate.getTime(), paidDays.startDate.getTime())}</span>
      {paidDays &&
        <DateRangePicker
          defaultValue={[paidDays.startDate, paidDays.endDate]}
          minDate={paidDays.startDate}
          maxDate={unPaidDays && unPaidDays.endDate ? unPaidDays.endDate : addYears(currentDay, 2)}
          onChange={([, endDate]) =>  endDate && setPaidDays({ startDate: paidDays.startDate, endDate })}
          shortcuts={false}
        />
      }
      <Button type='submit'>Add payment</Button>
    </form>
  )
}

export default AddPayment
