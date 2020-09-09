import React from 'react'
import { Link } from 'react-router-dom'
import { InputGroup, Navbar, NavbarGroup, NavbarHeading, Button } from '@blueprintjs/core'

const AddPlace = () => {
  return (
    <div>
      <Navbar>
        <NavbarGroup>
          <Link to='/places'>
            <Button minimal icon='undo' />
          </Link>
          <NavbarHeading>Add Place</NavbarHeading>
        </NavbarGroup>
      </Navbar>
      <h3 style={{color: 'red'}}>Validation Error</h3>
      <InputGroup placeholder="Place name" ></InputGroup>
      <InputGroup placeholder="Seats" ></InputGroup>
      <Button>Add</Button>
    </div>
  )
}

export default AddPlace
