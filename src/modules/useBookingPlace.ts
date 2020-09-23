import { useState } from 'react'
import firestoreCollection from './firestoreCollection'
import { BookingPlaceData } from '../interfaces'

const useBookingPlace = (placeId: string) => {
  const [collection] = useState(() => firestoreCollection('places'))

  const book = (bookingPlaceData: BookingPlaceData, oldBookings: BookingPlaceData[] = []) => {
    return collection
      .doc(placeId)
      .update({ bookings: [...oldBookings, bookingPlaceData] })
      .then(() => console.log('Booking added'))
      .catch(error => console.log(error))
  }

  return { book }
}

export default useBookingPlace