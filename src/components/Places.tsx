import React from 'react'
import { Navbar } from '@blueprintjs/core/lib/esm/components/navbar/navbar'
import { NavbarGroup } from '@blueprintjs/core/lib/esm/components/navbar/navbarGroup'
import { NavbarHeading } from '@blueprintjs/core/lib/esm/components/navbar/navbarHeading'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { Link } from 'react-router-dom'
import { Card } from '@blueprintjs/core/lib/esm/components/card/card'
import { Icon } from '@blueprintjs/core/lib/esm/components/icon/icon'

const Places: React.FC = () => {
  return (
    <div>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>Places</NavbarHeading>
          <Link to='/places/add'>
            <Button minimal icon='add' />
          </Link>
        </NavbarGroup>
      </Navbar>
      <Card>
        <h3>Place 1 </h3>
        <p><Icon icon="people" /> 5</p>
        <Link to='/places/place1/settings'>
          <Button>Edit</Button>
        </Link>
        <Button intent='danger'>Delete</Button>
      </Card>
      <Card>
        <h3>Place 2</h3>
        <p><Icon icon="people" /> 2</p>
        <Link to='/places/place1/settings'>
          <Button>Edit</Button>
        </Link>
        <Button intent='danger'>Delete</Button>
      </Card>
    </div>
  )
}

export default Places
