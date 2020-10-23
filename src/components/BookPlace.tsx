import React, { useEffect, useState } from 'react'
import useBookingPlace from '../modules/usePlaceBookings'
import toaster from '../modules/toaster'
import dateToString from '../modules/dateToString'
import AddPayment from './AddPayment'
import BookingPlaceData from '../interfaces/BookingPlaceData'
import FiniteDateRange from '../interfaces/FiniteDateRange'
import CustomDateRange from '../interfaces/CustomDateRange'
import Button from './Button'
import Checkbox from './Checkbox'
import Dialog from './Dialog'
import createFirebaseTimestampFromDate  from '../modules/createFirebaseTimestampFromDate'
import calculateDefaultPaidDays from '../modules/calculateDefaultPaidDays'
import AddBookingDates from './AddBookingDates'
import useMembersCollection from '../modules/useMembersCollection'
import AddMember from './AddMember'

interface BookPlaceProps {
  placeId: string
  onClose: () => void
  placeBookings: BookingPlaceData[]
  placeName: string
}


const BookPlace: React.FC<BookPlaceProps> = ({ onClose, placeId, placeBookings, placeName }) => {
  // Working with dates
  const [bookingDateRange, setBookingDateRange] = useState<CustomDateRange>()
  const [paidDays, setPaidDays] = useState<FiniteDateRange>()

  const [foreverFlag, setForeverFlag] = useState(false)
  const toggleForeverFlag = () => {
    setForeverFlag(!foreverFlag)
    if (bookingDateRange) {
      setBookingDateRange(bookingDateRange)
      setPaidDays(calculateDefaultPaidDays(bookingDateRange))
    }
  }

  // Getting info from inputs
  const { members } = useMembersCollection()
  const [membersNames, setMembersNames] = useState<string[]>([])
  useEffect(() => {
    if (members) {
      const membersNamesData: string[] = []
      members.forEach(member => membersNamesData.push(member.data().name))
      setMembersNames(membersNamesData)
    }
  }, [members])

  const [visitorName, setVisitorName] = useState('')
  const [visitorId, setVisitorId] = useState('')
  const placeholderValue = 'Choose user'
  const addMemberValue = 'Add new member'

  const onSelectUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value

    if(value === addMemberValue) {
      onAddMemberOpen()
      return
    }

    if (value === placeholderValue) {
      setVisitorName('')
      return
    }

    setVisitorName(value)
  }

  const onMemberAdded = (name: string, id: string) => {
    setVisitorName(name)
    setVisitorId(id)
    onAddMemberClose()
  }

  const [amount, setAmount] = useState<number>()

  const [disabledFlag, setDisabledFlag] = useState(false)

  const setPayment = (amount: number, paidDays: FiniteDateRange) => {
    setAmount(amount)
    setPaidDays(paidDays)
  }

  // Getting and sending data with firebase
  const { book } = useBookingPlace(placeId)
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDisabledFlag(true)

    if (!bookingDateRange || !paidDays || !visitorName || !amount) {
      setDisabledFlag(false)
      return
    }
    else bookPlace(amount, paidDays, bookingDateRange)
  }

  const validateBookings = (existingBooking: BookingPlaceData, newBooking: BookingPlaceData) => {
    if (!newBooking.endDate) {
      if (!existingBooking.endDate) {
        return false
      } else if (existingBooking.endDate >= newBooking.startDate) {
        return false
      }
    }

    if (existingBooking.endDate) {
      if (
        existingBooking.endDate >= newBooking.startDate &&
        existingBooking.startDate <= newBooking.endDate!
      ) {
        return false
      }
    } else if (existingBooking.startDate < newBooking.endDate! ) {
      return false
    }

    return true
  }

  const bookPlace = (amount: number, paidDays: FiniteDateRange, bookingDateRange: CustomDateRange) => {
    const newBooking = {
      startDate: createFirebaseTimestampFromDate(bookingDateRange.startDate),
      endDate: bookingDateRange.endDate ? createFirebaseTimestampFromDate(bookingDateRange.endDate) : null,
      visitorName,
      visitorId,
      placeName,
      amount,
      paidDays: {
        startDate: createFirebaseTimestampFromDate(paidDays.startDate),
        endDate: createFirebaseTimestampFromDate(paidDays.endDate)
      }
    }

    if (!placeBookings.every((existingBooking) => validateBookings(existingBooking, newBooking))) {
      toaster.show({ message: 'This place is already have booked on this day', intent: 'danger' })
      setDisabledFlag(false)
      return
    }
    book(newBooking, placeBookings)
      .then(() => {
        toaster.show({ message: 'The place has been booked' })
        setDisabledFlag(false)
        onClose()
      })
      .catch(({ message }) => {
        toaster.show({ message, intent: 'danger' })
        setDisabledFlag(false)
      })
  }

  // Managing modal windows
  const [isBookingDatesOpen, setIsBookingDatesOpen] = useState(false)
  const onBookingDatesOpen = () => setIsBookingDatesOpen(true)
  const onBookingDatesClose = () => setIsBookingDatesOpen(false)

  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const onPaymentOpen = () => setIsPaymentOpen(true)
  const onPaymentClose = () => setIsPaymentOpen(false)

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const onAddMemberOpen = () => setIsAddMemberOpen(true)
  const onAddMemberClose = () => setIsAddMemberOpen(false)

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Checkbox
          checked={foreverFlag}
          onChange={toggleForeverFlag}
          disabled={disabledFlag}
          label='Forever booking'
        />
        <Button disabled={disabledFlag} onClick={onBookingDatesOpen}>
          {bookingDateRange
            ? `Booked Days: ${dateToString(bookingDateRange.startDate)} - 
            ${bookingDateRange?.endDate ? dateToString(bookingDateRange.endDate) : 'Forever'}`
            : 'Choose Booking Dates'
          }
        </Button>
        <select
          value={visitorName}
          required
          onChange={onSelectUserChange}
          disabled={disabledFlag}
        >
          <option value={placeholderValue} selected>Choose user</option>
          {membersNames.map(name => <option key={'id' + name} value={name}>{name}</option>)}
          <option value={addMemberValue}>{addMemberValue}</option>
        </select>
        <Dialog
          isOpen={isAddMemberOpen}
          onClose={onAddMemberClose}
          title='Add new member'
        >
          <AddMember onMemberAdded={onMemberAdded} />
        </Dialog>
        <Button onClick={onPaymentOpen} disabled={disabledFlag || !bookingDateRange}>
          {paidDays
            ? `Paid days: ${dateToString(paidDays.startDate)} - ${dateToString(paidDays.endDate)}`
            : 'Add payment'
          }
        </Button>
        <Button type='submit' disabled={!bookingDateRange || !paidDays || !visitorName || !amount || disabledFlag}>
          Book
        </Button>
      </form>
      <AddBookingDates
        setBookingDateRange={setBookingDateRange}
        setPaidDays={setPaidDays}
        foreverFlag={foreverFlag}
        onBookingDatesClose={onBookingDatesClose}
        isBookingDatesOpen={isBookingDatesOpen}
      />
      <Dialog
        title='Add payment'
        isOpen={isPaymentOpen}
        onClose={onPaymentClose}
        canOutsideClickClose={false}
        isCloseButtonShown={false}
      >
        {paidDays &&
          <AddPayment
            defaultPaidDays={paidDays}
            onSubmit={setPayment}
            onPaymentComplete={onPaymentClose}
            foreverFlag={foreverFlag}
          />
        }
      </Dialog>
    </div>
  )
}

export default BookPlace
