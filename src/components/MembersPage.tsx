import React, { useState } from 'react'
import styled from 'styled-components'
import checkIsActualBooking from '../modules/checkIsActual'
import createFirebaseTimestampFromDate from '../modules/createFirebaseTimestampFromDate'
import dateToString from '../modules/dateToString'
import Button from './Button'
import Card from './Card'
import Dialog from './Dialog'
import Navbar from './Navbar'
import NavbarGroup from './NavbarGroup'
import NavbarHeading from './NavbarHeading'

const BookingItem = styled.div`
  padding-left: 10px;
  color: ${(props: {isActual: boolean}) => props.isActual ? 'black' : 'gray'};
`

const fakeMembersData = [
  {
    name: 'Alex',
    email: 'alex@gmail.com',
    number: '+380951234567',
    bookings: [
      {
        startDate: createFirebaseTimestampFromDate(new Date('2020-09-10')),
        endDate: createFirebaseTimestampFromDate(new Date('2020-09-12')),
        placeName: 'P1',
        amount: 900,
        paidDays: {
          startDate: createFirebaseTimestampFromDate(new Date('2020-09-10')),
          endDate: createFirebaseTimestampFromDate(new Date('2020-09-11')),
        }
      },
      {
        startDate: createFirebaseTimestampFromDate(new Date('2020-10-02')),
        endDate: createFirebaseTimestampFromDate(new Date('2020-10-06')),
        placeName: 'P2',
        amount: 400,
        paidDays: {
          startDate: createFirebaseTimestampFromDate(new Date('2020-10-02')),
          endDate: createFirebaseTimestampFromDate(new Date('2020-10-04')),
        }
      },
    ]
  },
  {
    name: 'Oleg',
    email: 'oleg@gmail.com',
    number: '+380951234567',
    bookings: [
      {
        startDate: createFirebaseTimestampFromDate(new Date('2020-09-13')),
        endDate: createFirebaseTimestampFromDate(new Date('2020-09-14')),
        placeName: 'P1',
        amount: 800,
        paidDays: {
          startDate: createFirebaseTimestampFromDate(new Date('2020-09-13')),
          endDate: createFirebaseTimestampFromDate(new Date('2020-09-14')),
        }
      },
      {
        startDate: createFirebaseTimestampFromDate(new Date('2020-10-22')),
        endDate: null,
        placeName: 'P2',
        amount: 500,
        paidDays: {
          startDate: createFirebaseTimestampFromDate(new Date('2020-10-22')),
          endDate: createFirebaseTimestampFromDate(new Date('2020-11-22')),
        }
      },
      {
        startDate: createFirebaseTimestampFromDate(new Date('2020-10-20')),
        endDate: createFirebaseTimestampFromDate(new Date('2020-10-22')),
        placeName: 'P2',
        amount: 500,
        paidDays: {
          startDate: createFirebaseTimestampFromDate(new Date('2020-10-21')),
          endDate: null,
        }
      },
      {
        startDate: createFirebaseTimestampFromDate(new Date('2020-10-19')),
        endDate: createFirebaseTimestampFromDate(new Date('2020-10-20')),
        placeName: 'P2',
        amount: 500,
        paidDays: {
          startDate: createFirebaseTimestampFromDate(new Date('2020-10-21')),
          endDate: createFirebaseTimestampFromDate(new Date('2020-10-21')),
        }
      },
    ]
  }
]

const MembersPage = () => {
  const onAddNewMember = () => console.log(1)
  const [showBookings, setShowBookings] = useState(false)

  return (
    <div>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>Members</NavbarHeading>
          <Button onClick={onAddNewMember} minimal icon='add' />
        </NavbarGroup>
      </Navbar>
      {fakeMembersData.map(member =>
        <Card>
          <p>
            Username: {member.name}
          </p>
          <p>
            Email: {member.email}
          </p>
          <p>
            Number: {member.number}
          </p>
          <p>
            Actual booking: {
              member.bookings.find(booking =>
                checkIsActualBooking(booking.startDate, booking.endDate)
              )?.placeName || 'none'
            }
          </p>
          <Button onClick={() => setShowBookings(!showBookings)}>See details</Button>
          <Dialog
            isOpen={showBookings}
            onClose={() => setShowBookings(false)}
            title='Bookings'
          >
            {member.bookings.map((booking, index) =>
              <BookingItem key={index} isActual={checkIsActualBooking(booking.startDate, booking.endDate)}>
                <h4>{index + 1}</h4>
                <p>Amount: {booking.amount}</p>
                <p>First Day: {dateToString(booking.startDate.toDate())}</p>
                <p>Last Day: {booking.endDate ? dateToString(booking.endDate.toDate()) : 'Forever'}</p>
              </BookingItem>
            )}
          </Dialog>
        </Card>
      )}
    </div>
  )
}

export default MembersPage
