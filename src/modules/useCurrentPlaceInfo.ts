import { useState, useEffect } from 'react'
import { AddPlaceData as CurrentPlaceData } from '../interfaces'
import firestoreCollection from './firestoreCollection'

const useCurrentPlaceInfo = (placeId: string) => {
  const [collection] = useState(() => firestoreCollection<CurrentPlaceData>('places'))
  const [placeData, setPlaceData] = useState<CurrentPlaceData>()

  useEffect(() => {
    collection.doc(placeId).get()
      .then(doc => setPlaceData(doc.data()))
      .catch(error => console.log(error))
  }, [collection, placeId])

  return { placeData }
}

export default useCurrentPlaceInfo
