import React, { useState } from 'react'
// import styled from 'styled-components'
import useMembersCollection from '../modules/useMembersCollection'
import AddNewMember from './AddNewMember'
import Button from './Button'
import Card from './Card'
import Dialog from './Dialog'
import Navbar from './Navbar'
import NavbarGroup from './NavbarGroup'
import NavbarHeading from './NavbarHeading'

// const BookingItem = styled.div`
//   padding-left: 10px;
//   color: ${(props: {isActual: boolean}) => props.isActual ? 'black' : 'gray'};
// `

const MembersPage: React.FC = () => {
  const { members } = useMembersCollection()
  const [showBookings, setShowBookings] = useState(false)

  const [isAddNewMemberOpen, setIsAddNewMemberOpen] = useState(false)
  const onAddNewMemberClose = () => setIsAddNewMemberOpen(false)
  const onAddNewMemberOpen = () => setIsAddNewMemberOpen(true)


  return (
    <div>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>Members</NavbarHeading>
          <Button onClick={onAddNewMemberOpen} minimal icon='add' />
        </NavbarGroup>
      </Navbar>
      <Dialog
        title='Add new Member'
        isOpen={isAddNewMemberOpen}
        onClose={onAddNewMemberClose}
      >
        <AddNewMember onMemberAdded={onAddNewMemberClose} />
      </Dialog>
      {members.map(member =>
        <Card>
          <p>
            Username: {member.data().name}
          </p>
          <p>
            Email: {member.data().email}
          </p>
          <p>
            Number: {member.data().number}
          </p>
          {/* <p>
            Actual booking: {
              member.data().bookings.find(booking =>
                checkIsActualBooking(booking.startDate, booking.endDate)
              )?.placeName || 'none'
            }
          </p> */}
          <Button onClick={() => setShowBookings(!showBookings)}>See details</Button>
          <Dialog
            isOpen={showBookings}
            onClose={() => setShowBookings(false)}
            title='Bookings'
          >
            {/* {member.data().bookings.map((booking, index) =>
              <BookingItem key={index} isActual={checkIsActualBooking(booking.startDate, booking.endDate)}>
                <h4>{index + 1}</h4>
                <p>Amount: {booking.amount}</p>
                <p>First Day: {dateToString(booking.startDate.toDate())}</p>
                <p>Last Day: {booking.endDate ? dateToString(booking.endDate.toDate()) : 'Forever'}</p>
              </BookingItem>
            )} */}
          </Dialog>
        </Card>
      )}
    </div>
  )
}

export default MembersPage
