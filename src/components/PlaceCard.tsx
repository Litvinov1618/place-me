import React, { useState } from 'react'
import { Alert } from '@blueprintjs/core/lib/esm/components/alert/alert'
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons'
import { Card } from '@blueprintjs/core/lib/esm/components/card/card'
import { Icon } from '@blueprintjs/core/lib/esm/components/icon/icon'
import { AddPlaceData } from '../interfaces'
import { Dialog } from '@blueprintjs/core/lib/esm/components/dialog/dialog'
import EditPlace from './EditPlace'
import { AppToaster } from '../modules/toaster'
import usePlacesCollection from '../modules/usePlacesCollection'

interface PlaceCardProps {
  placeId: string
  placeData: AddPlaceData
}

const PlaceCard: React.FC<PlaceCardProps> = ({ placeId, placeData }) => {
  const { remove } = usePlacesCollection(false)

  const [isEditPlaceOpen, setIsEditPlaceOpen] = useState(false)
  const handleEditPlaceClose = () => setIsEditPlaceOpen(false)
  const handleEditPlaceOpen = () => setIsEditPlaceOpen(true)
  
  const [isDeletionAlertOpen, setIsDeletionAlertOpen] = useState(false)
  const handleDeletionAlertOpen = () => setIsDeletionAlertOpen(true)
  const handleDeletionAlertClose = () => setIsDeletionAlertOpen(false)

  const removePlace = () => {
    remove(placeId)
    AppToaster.show({ message: 'Place deleted.', intent: 'warning' })
  }

  return (
    <div>
      <Card key={placeId}>
        <h3>{placeData.name}</h3>
        <p>
          <Icon icon='people' /> {placeData.seats}
        </p>
        <Button onClick={handleEditPlaceOpen}>Edit</Button>
        <Button onClick={handleDeletionAlertOpen} intent='danger'>Delete</Button>
      </Card>
      <Dialog
        title='Edit Place'
        canOutsideClickClose
        isCloseButtonShown
        isOpen={isEditPlaceOpen}
        onClose={handleEditPlaceClose}
      >
        <EditPlace placeId={placeId} handleClose={handleEditPlaceClose} />
      </Dialog>
      <Alert
        isOpen={isDeletionAlertOpen}
        onClose={handleDeletionAlertClose}
        cancelButtonText='Cancel'
        confirmButtonText='Delete'
        onCancel={handleDeletionAlertClose}
        onConfirm={removePlace}
        intent='danger'
      >
        <p>Are you sure you want to delete this place?</p>
      </Alert>
    </div>
  )
}

export default PlaceCard
