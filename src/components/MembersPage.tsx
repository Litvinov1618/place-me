import React from 'react'
import styled from 'styled-components'
import createFirebaseTimestampFromDate from '../modules/createFirebaseTimestampFromDate'
import dateToString from '../modules/dateToString'
import Button from './Button'
import Card from './Card'
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
    ]
  }
]

const MembersPage = () => {
  const onAddNewMember = () => console.log(1)

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
            User email: {member.email}
          </p>
          {member.bookings.map((booking, index) => 
            <BookingItem key={index} isActual={booking.startDate.toMillis() <= Date.now()}>
              <h4>{index + 1}</h4>
              <p>Amount: {booking.amount}</p>
              <p>First Day: {dateToString(booking.startDate.toDate())}</p>
              <p>Last Day: {booking.endDate ? dateToString(booking.endDate.toDate()) : 'Forever'}</p>
            </BookingItem>
          )}
        </Card>
      )}
    </div>
  )
}

export default MembersPage
