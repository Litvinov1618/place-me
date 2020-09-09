import { useState, useEffect } from 'react'
import IFirestoreData from '../interfaces/firestoreData'

const firestoreData = [
  {
    name: 'Place 1',
    seats: 5,
    archived: false,
  },
  {
    name: 'Place 2',
    seats: 10,
    archived: false,
  },
  {
    name: 'Place 3',
    seats: 2,
    archived: true,
  },
]

const useCollectionPlaces = (immediate = true) => {
  const [places, setPlaces] = useState<IFirestoreData[]>([])
 
  const deletePlace = (placeName: string) => {
    const newPlaces = places.map(place => {
      if(place.name === placeName) {
        return {...place, archived: true}
      }
      return place
    })
    setPlaces(newPlaces)
  }

  const addPlace = (placeName: string, placeSeats: number) => {
    setPlaces([...places, {name: placeName, seats: placeSeats, archived: false}])
  }

  useEffect(() => {
    if (immediate)
      setTimeout(() => setPlaces(firestoreData), 1000)
  }, [immediate]);

  return { places, deletePlace, addPlace }
}

export default useCollectionPlaces
