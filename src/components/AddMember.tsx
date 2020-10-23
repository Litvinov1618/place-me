import React, { useState } from 'react'
import toaster from '../modules/toaster'
import useMembersCollection from '../modules/useMembersCollection'
import Button from './Button'
import InputGroup from './InputGroup'

interface AddNewMemberProps {
  onMemberAdded: (name: string, id: string) => void
}

const AddMember: React.FC<AddNewMemberProps> = ({ onMemberAdded }) => {
  const { add } = useMembersCollection(false)

  const [name, setName] = useState('')
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)

  const [email, setEmail] = useState('')
  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)

  const [number, setNumber] = useState('')
  const onNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => setNumber(event.target.value)

  const [disabledFlag, setDisabledFlag] = useState(false)

  const addNewMember = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDisabledFlag(true)
    add({
      name,
      email,
      number,
      bookings: []
    })
      .then((id) => {
        toaster.show({ message: 'New member added' })
        setDisabledFlag(false)
        onMemberAdded(name, id)
      })
      .catch(({ message }) => {
        toaster.show({ message, intent: 'danger' })
        setDisabledFlag(false)
      })
  }

  return (
    <form onSubmit={addNewMember}>
      <InputGroup
        placeholder='Name'
        value={name}
        onChange={onNameChange}
        disabled={disabledFlag}
        required
      />
      <InputGroup
        placeholder='Email'
        value={email}
        onChange={onEmailChange}
        disabled={disabledFlag}
        required
      />
      <InputGroup
        placeholder='Number'
        value={number}
        onChange={onNumberChange}
        disabled={disabledFlag}
        required
      />
      <Button disabled={disabledFlag || !number || !email || !name} type='submit'>Create new member</Button>
    </form>
  )
}

export default AddMember
