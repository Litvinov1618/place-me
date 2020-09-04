import React from 'react'
import { Navbar } from '@blueprintjs/core/lib/esm/components/navbar/navbar'
import { NavbarGroup } from '@blueprintjs/core/lib/esm/components/navbar/navbarGroup'
import { NavbarHeading } from '@blueprintjs/core/lib/esm/components/navbar/navbarHeading'
import { NavbarDivider } from '@blueprintjs/core/lib/esm/components/navbar/navbarDivider'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <Navbar fixedToTop>
      <NavbarGroup>
        <NavbarHeading><Link to="/">Place-me</Link></NavbarHeading>
        <NavbarDivider />
        <Button><Link to="places/create">Create Place</Link></Button>
      </NavbarGroup>
    </Navbar>
  )
}

export default Navigation
