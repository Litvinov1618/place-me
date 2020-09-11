import { useState, useEffect } from 'react'
import firebase from './firebase'

const useCollectionPlaces = (withData = true) => {
  const [collection] = useState(() => firebase.firestore().collection('places'))
  const [places, setPlaces] = useState<any[]>([])

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
      .then(() => console.log('Place archived'))
      .catch(error => console.log(error))
  }

  const add = ({name, seats}: {name: string, seats: number}) => {
    return collection
      .add({name, seats, archived: false})
      .then(() => console.log('Added new place'))
      .catch((error) => console.log(error))
  }

  const edit = (placeId: string, newPlaceName: string, newPlaceSeats: number) => {
    return collection
      .doc(placeId)
      .update({name: newPlaceName, seats: newPlaceSeats, archived: false})
      .then(() => console.log(`Place ${placeId} updated`))
      .catch((error) => console.log(error))
  }

  return { places, remove, add, edit }
}

export default useCollectionPlaces
