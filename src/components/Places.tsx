import React from 'react'
import { Navbar } from '@blueprintjs/core/lib/esm/components/navbar/navbar'
import { NavbarGroup } from '@blueprintjs/core/lib/esm/components/navbar/navbarGroup'
import { NavbarHeading } from '@blueprintjs/core/lib/esm/components/navbar/navbarHeading'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { Link } from 'react-router-dom'
import { Card } from '@blueprintjs/core/lib/esm/components/card/card'
import { Icon } from '@blueprintjs/core/lib/esm/components/icon/icon'
import IFirestoreData from './interfaces/firestoreData'

interface PlacesProps {
  places: IFirestoreData[],
  deletePlace: (placeName: string) => void
}

const Places: React.FC<PlacesProps> = ({places, deletePlace}) => {
  return (
    <div>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>Places</NavbarHeading>
          <Link to="/places/add">
            <Button minimal icon="add" />
          </Link>
        </NavbarGroup>
      </Navbar>
      {places
        .filter((place: IFirestoreData) => !place.archived)
        .map((place: IFirestoreData) => 
          <Card key={place.name}>
            <h3>{place.name}</h3>
            <p>
              <Icon icon="people" /> {place.seats}
            </p>
            <Link to="/places/place1/edit">
              <Button>Edit</Button>
            </Link>
            <Button onClick={() => deletePlace(place.name)} intent="danger">Delete</Button>
          </Card>
        )
      }
    </div>
  )
}

export default Places
