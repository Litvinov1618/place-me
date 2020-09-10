import { useState, useEffect } from 'react'
import firebase from './firebase'

const useCollectionPlaces = (immediate = true) => {
  const collection = firebase.firestore().collection('places')
  const [places, setPlaces] = useState<any[]>([])

  useEffect(() => {
    if (immediate)
      return collection.where('archived', '==', false).onSnapshot(
        snapshot => {
          setPlaces(snapshot.docs)
        }
      )
  }, [immediate, collection])
 
  const deletePlace = (placeId: string, placeInfo: any) => {
    return collection
      .doc(placeId)
      .update({...placeInfo, archived: true})
      .then(() => console.log('Place archived'))
      .catch(error => console.log(error))
  }

  const addPlace = (placeName: string, placeSeats: number) => {
    return collection
      .add({name: placeName, seats: placeSeats, archived: false})
      .then(() => console.log('Added new place'))
      .catch((error) => console.log(error))
  }

  const editPlace = (placeId: string, newPlaceName: string, newPlaceSeats: number) => {
    return collection
      .doc(placeId)
      .update({name: newPlaceName, seats: newPlaceSeats, archived: false})
      .then(() => console.log(`Place ${placeId} updated`))
      .catch((error) => console.log(error))
  }

  return { places, deletePlace, addPlace, editPlace }
}

export default useCollectionPlaces
