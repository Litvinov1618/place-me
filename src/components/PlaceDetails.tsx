import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { Navbar } from '@blueprintjs/core/lib/esm/components/navbar/navbar'
import { NavbarGroup } from '@blueprintjs/core/lib/esm/components/navbar/navbarGroup'
import { NavbarHeading } from '@blueprintjs/core/lib/esm/components/navbar/navbarHeading'
import React from 'react'
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
