import { useState, useEffect } from 'react'
import { IPlaceCollection, PlaceData, EditPlaceData, AddPlaceData } from '../interfaces'
import firestoreCollection from './firestoreCollection';

const usePlacesCollection = (withData = true) => {
  const [collection] = useState(() => firestoreCollection<PlaceData>('places'))
  const [places, setPlaces] = useState<IPlaceCollection[]>([])

  useEffect(() => {
    if (withData)
      return collection.where('archived', '==', false).onSnapshot(
        snapshot => {
          setPlaces(snapshot.docs)
        }
      )
  }, [withData, collection])
 
  const remove = (placeId: string) => {
    return collection
      .doc(placeId)
      .update({ archived: true })
      .then(() => console.log('Place archived.'))
      .catch(error => console.log(error))
  }

  const add = ({ name, seats }: AddPlaceData) => {
    return collection
      .add({ name, seats, archived: false})
      .then(() => console.log('New place added.'))
      .catch((error) => console.log(error))
  }

  const edit = (placeId: string, { name, seats }: EditPlaceData) => {
    return collection
      .doc(placeId)
      .update({ name, seats: seats, archived: false })
      .then(() => console.log(`Place ${placeId} edited.`))
      .catch((error) => console.log(error))
  }

  return { places, remove, add, edit }
}

export default usePlacesCollection
