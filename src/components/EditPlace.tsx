import React from 'react'
import { Navbar, NavbarGroup, Button, NavbarHeading, InputGroup } from '@blueprintjs/core'
import { Link } from 'react-router-dom'

const EditPlace = () => {
  return (
    <div>
      <Navbar>
        <NavbarGroup>
          <Link to='/places'>
            <Button minimal icon='undo' />
          </Link>
          <NavbarHeading>Place 1 Edit</NavbarHeading>
        </NavbarGroup>
      </Navbar>
      <h3 style={{color: 'red'}}>Validation Error</h3>
      <InputGroup placeholder='Place name' />
      <InputGroup placeholder='Seats' />
      <Button>Save</Button>
    </div>
  )
}

export default EditPlace
