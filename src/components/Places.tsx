import React, { useState } from 'react'
import { Navbar } from '@blueprintjs/core/lib/esm/components/navbar/navbar'
import { NavbarGroup } from '@blueprintjs/core/lib/esm/components/navbar/navbarGroup'
import { NavbarHeading } from '@blueprintjs/core/lib/esm/components/navbar/navbarHeading'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { Card } from '@blueprintjs/core/lib/esm/components/card/card'
import { Icon } from '@blueprintjs/core/lib/esm/components/icon/icon'
import { IPlaceCollection } from '../interfaces'
import { Classes, Dialog } from '@blueprintjs/core'
import usePlacesCollection from './Firebase/usePlacesCollection'
import AddPlace from './AddPlace'
import EditPlace from './EditPlace'
import { Alert } from '@blueprintjs/core/lib/esm/components/alert/alert'
import { AppToaster } from './toaster'

const Places: React.FC = () => {
  const { places, remove } = usePlacesCollection()

  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false)
  const [isEditPlaceOpen, setIsEditPlaceOpen] = useState(false)
  const [isDeletionAlertOpen, setIsDeletionAlertOpen] = useState(false)

  const [editPlaceId, setEditPlaceId] = useState('')

  const handleEditPlaceOpen = (placeId: string) => {
    setIsEditPlaceOpen(true)
    setEditPlaceId(placeId)
  }
  const handleEditPlaceClose = () => {
    setIsEditPlaceOpen(false)
  }
  const handleAddPlaceOpen = () => {
    setIsAddPlaceOpen(true)
  }
  const handleAddPlaceClose = () => {
    setIsAddPlaceOpen(false)
  }
  const handleDeletionAlrertOpen = () => {
    setIsDeletionAlertOpen(true)
  }
  const handleDeletionAlrertClose = () => {
    setIsDeletionAlertOpen(false)
  }

  return (
    <div>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>Places</NavbarHeading>
          <Button onClick={handleAddPlaceOpen} minimal icon="add" />
        </NavbarGroup>
      </Navbar>
      {places.map((place: IPlaceCollection) => 
        <Card key={place.id}>
          <h3>{place.data().name}</h3>
          <p>
            <Icon icon="people" /> {place.data().seats}
          </p>
          <Button onClick={() => handleEditPlaceOpen(place.id)}>Edit</Button>
          <Button
            onClick={handleDeletionAlrertOpen}
            intent="danger">
              Delete
          </Button>
          <Alert
            isOpen={isDeletionAlertOpen}
            onClose={handleDeletionAlrertClose}
            cancelButtonText="Cancel"
            confirmButtonText="Delete"
            onCancel={handleDeletionAlrertClose}
            onConfirm={() => {
              remove(place.id)
              AppToaster.show({message: `Place deleted.`})
            }}
            intent="danger"
          >
            <p>
              Are you shure you want to delete this place?
            </p>
          </Alert>
        </Card>
        )
      }
      {/* Modal windows */}
      <Dialog
        title="Add Place"
        canOutsideClickClose
        isCloseButtonShown
        isOpen={isAddPlaceOpen}
        onClose={handleAddPlaceClose}
      >
        <div className={Classes.DIALOG_BODY}>
          <AddPlace handleClose={handleAddPlaceClose} />
        </div>
      </Dialog>
      <Dialog
        title="Edit Place"
        canOutsideClickClose
        isCloseButtonShown
        isOpen={isEditPlaceOpen}
        onClose={handleEditPlaceClose}
      >
        <div className={Classes.DIALOG_BODY}>
          <EditPlace placeId={editPlaceId} handleClose={handleEditPlaceClose} />
        </div>
      </Dialog>
    </div>
  )
}

export default Places
