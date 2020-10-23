import React, { useEffect, useState } from 'react'
import BookingPlaceData from '../interfaces/BookingPlaceData'
import styled from 'styled-components'
import MembersSnapshot from '../interfaces/MembersSnapshot'
import usePlacesCollection from '../modules/usePlacesCollection'
import Button from './Button'
import Card from './Card'
import Dialog from './Dialog'
import checkIsActualBooking from '../modules/checkIsActual'
import dateToString from '../modules/dateToString'

const BookingItem = styled.div`
  padding-left: 10px;
  color: ${(props: {isActual: boolean}) => props.isActual ? 'black' : 'gray'};
`

interface MemberCardProps{
  member: MembersSnapshot
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const { places } = usePlacesCollection()
  const [showBookings, setShowBookings] = useState(false)
  const [memberBookings, setMemberBookings] = useState<BookingPlaceData[]>([])

  useEffect(() => {
    if (places) {
      const memberBookings: BookingPlaceData[] = []
      places.forEach(place => {
        const placeData = place.data()

        placeData.bookings.forEach(booking => {
          if (booking.visitorId === member.id) memberBookings.push(booking)
        })
      })

      setMemberBookings(memberBookings)
    }
  }, [places, member.id])

  return (
    <Card key={member.id}>
      <p>
        Username: {member.data().name}
      </p>
      <p>
        Email: {member.data().email}
      </p>
      <p>
        Number: {member.data().number}
      </p>
      <p>Actual booking: {memberBookings.find(booking => checkIsActualBooking(booking.startDate, booking.endDate))?.placeName || 'none'}
      </p>
      <Button onClick={() => setShowBookings(!showBookings)}>See bookings</Button>
      <Dialog
        isOpen={showBookings}
        onClose={() => setShowBookings(false)}
        title='Bookings'
      >
        {memberBookings
          .sort((currentBooking, previousBooking) => {
            if (checkIsActualBooking(currentBooking.startDate, previousBooking.endDate)) return -1
            return 1
          })
          .map((booking, index) =>
            <BookingItem key={index} isActual={checkIsActualBooking(booking.startDate, booking.endDate)}>
              <h4>{index + 1}</h4>
              <p>Amount: {booking.amount}</p>
              <p>First Day: {dateToString(booking.startDate.toDate())}</p>
              <p>Last Day: {booking.endDate ? dateToString(booking.endDate.toDate()) : 'Forever'}</p>
              <p>{booking.placeName}</p>
            </BookingItem>
        )}
      </Dialog>
    </Card>
  )
}

export default MemberCard
