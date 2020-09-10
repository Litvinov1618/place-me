import { useState, useEffect } from 'react'
import IFirestoreData from '../interfaces/firestoreData'

const firestoreData = [
  {
    name: 'Place 1',
    seats: 5,
    archived: false,
    id: 4563,
  },
  {
    name: 'Place 2',
    seats: 10,
    archived: false,
    id: 1938,
  },
  {
    name: 'Place 3',
    seats: 2,
    archived: true,
    id: 1849,
  },
]

const getRandomId = () => {
  return Math.floor(Math.random() * (9000 - 1000) + 1000); 
}

const useCollectionPlaces = (immediate = true) => {
  const [places, setPlaces] = useState<IFirestoreData[]>([])
 
  const deletePlace = (placeId: number) => {
    const newPlaces = places.map(place => {
      if(place.id === placeId) {
        return {...place, archived: true}
      }
      return place
    })

    setPlaces(newPlaces)
  }

  const addPlace = (placeName: string, placeSeats: number) => {
    setPlaces([...places, {name: placeName, seats: placeSeats, archived: false, id: getRandomId()}])
  }

  const editPlace = (placeId: number, newPlaceName: string, newPlaceSeats: number) => {
    const newPlaces = places.map(place => {
      if(place.id === placeId) {
        return {...place, name: newPlaceName, seats: newPlaceSeats}
      }
      return place
    })

    setPlaces(newPlaces)
  }

  useEffect(() => {
    if (immediate)
      setTimeout(() => setPlaces(firestoreData), 1000)
  }, [immediate]);
  return { places, deletePlace, addPlace, editPlace }
}

export default useCollectionPlaces
