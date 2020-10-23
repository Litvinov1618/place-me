import React, { useState } from 'react'
import useMembersCollection from '../modules/useMembersCollection'
import AddMember from './AddMember'
import Button from './Button'
import Dialog from './Dialog'
import MemberCard from './MemberCard'
import Navbar from './Navbar'
import NavbarGroup from './NavbarGroup'
import NavbarHeading from './NavbarHeading'

const MembersPage: React.FC = () => {
  const { members } = useMembersCollection()

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
        <AddMember onMemberAdded={onAddNewMemberClose} />
      </Dialog>
      {members.map(member =>
        <MemberCard key={member.id} member={member} />
      )}
    </div>
  )
}

export default MembersPage
