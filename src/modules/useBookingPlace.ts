import { useState } from 'react'
import firestoreCollection from './firestoreCollection'
import { BookingPlaceData } from '../interfaces'

const useBookingPlace = (placeId: string) => {
  const [collection] = useState(() => firestoreCollection('places').doc(placeId).collection('bookings'))

  const add = (bookingPlaceData: BookingPlaceData) => {
    return collection
      .add(bookingPlaceData)
      .then(() => console.log('Booking added'))
      .catch(error => console.log(error))
  }

  return { add }
}

export default useBookingPlace