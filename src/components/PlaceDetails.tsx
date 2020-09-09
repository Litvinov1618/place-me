import React from 'react'
import { Navbar, NavbarGroup, Button, NavbarHeading } from '@blueprintjs/core'
import { Link } from 'react-router-dom'

const PlaceDetails = () => {
  return (
    <div>
      <Navbar>
        <NavbarGroup>
          <Link to='/places'>
            <Button minimal icon='undo' />
          </Link>
          <NavbarHeading>Place 1</NavbarHeading>
        </NavbarGroup>
      </Navbar>
      <Button intent='danger'>Delete</Button>
      <Link to='place1/settings'>
        <Button>Edit</Button>
      </Link>
    </div>
  )
}

export default PlaceDetails
