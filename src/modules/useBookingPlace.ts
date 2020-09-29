import { useState } from 'react'
import firestoreCollection from './firestoreCollection'
import { BookingPlaceData } from '../interfaces'
import firebase from './firebase'
import usePaymentsCollection from '../modules/usePaymentsCollection'
import Timestamp from '../modules/timestamp'

const useBookingPlace = (placeId: string) => {
  const [collection] = useState(() => firestoreCollection('places'))

  const { add } = usePaymentsCollection(false)

  const book = (bookingPlaceData: BookingPlaceData, oldBookings: BookingPlaceData[] = []) => {
    return firebase
      .firestore()
      .runTransaction(async () => {
        await collection
          .doc(placeId)
          .update({ bookings: [...oldBookings, bookingPlaceData] })
          .then(() => console.log('Booking added'))
          .catch(error => console.log(error))
        await add({
          paymentDate: Timestamp.now(),
          visitorName: bookingPlaceData.visitorName,
          placeName: bookingPlaceData.placeName,
          amount: bookingPlaceData.amount,
          bookingDate: {
            startDate: bookingPlaceData.startDate,
            endDate: bookingPlaceData.endDate
          }
          })
          .then(() => console.log('Payment added'))
          .catch(error => console.log(error))
      })
      .then(() => console.log('Transaction completed'))
      .catch(error => console.log(error))
  }

  return { book }
}

export default useBookingPlace
