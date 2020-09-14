import { useState, useEffect } from 'react'
import { AddPlaceData as CurrentPlaceData } from '../../interfaces'
import firebase from './firebase'

const useCurrentPlace = (placeId: string) => {
  const [collection] = useState(() => firebase.firestore().collection('places') as firebase.firestore.CollectionReference<CurrentPlaceData>)
  const [placeData, setPlaceData] = useState<CurrentPlaceData>()

  useEffect(() => {
    collection.doc(placeId).get()
      .then(doc => setPlaceData(doc.data()))
      .catch(error => console.log(error))
  }, [collection, placeId])

  return { placeData }
}

export default useCurrentPlace