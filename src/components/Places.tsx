import React from 'react'
import { Navbar } from '@blueprintjs/core/lib/esm/components/navbar/navbar'
import { NavbarGroup } from '@blueprintjs/core/lib/esm/components/navbar/navbarGroup'
import { NavbarHeading } from '@blueprintjs/core/lib/esm/components/navbar/navbarHeading'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { Link } from 'react-router-dom'
import { Card } from '@blueprintjs/core/lib/esm/components/card/card'
import { Icon } from '@blueprintjs/core/lib/esm/components/icon/icon'
import useCollectionPlaces from './Firebase/useCollectionPlaces'

const Places: React.FC = () => {
  const { places, deletePlace } = useCollectionPlaces()

  return (
    <>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>Places</NavbarHeading>
          <Link to="/places/add">
            <Button minimal icon="add" />
          </Link>
        </NavbarGroup>
      </Navbar>
      {places.map((place: any) => 
          <Card key={place.id}>
            <h3>{place.data().name}</h3>
            <p>
              <Icon icon="people" /> {place.data().seats}
            </p>
            <Link to={`places/${place.id}/edit`}>
              <Button>Edit</Button>
            </Link>
            <Button
              onClick={() => deletePlace(place.id, place.data())}
              intent="danger">
                Delete
            </Button>
          </Card>
        )
      }
    </>
  )
}

export default Places
