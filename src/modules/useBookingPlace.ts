import { useState } from 'react'
import firestoreCollection from './firestoreCollection'
import firebase from './firebase'
import usePaymentsCollection from '../modules/usePaymentsCollection'
import BookingPlaceData from '../interfaces/BookingPlaceData'
import createFirebaseNowTimestamp from './createFirebaseNowTimestamp'

const useBookingPlace = (placeId: string) => {
  const [collection] = useState(() => firestoreCollection('places'))

  const { add } = usePaymentsCollection(false)

  const book = (bookingPlaceData: BookingPlaceData, existingBookings: BookingPlaceData[]) => {
    return firebase
      .firestore()
      .runTransaction(async () => {
        await collection
          .doc(placeId)
          .update({ bookings: [...existingBookings, bookingPlaceData] })
          .then(() => console.log('Booking added'))
          .catch(error => console.log(error))

        await add({
            ...bookingPlaceData,
            paymentDate: createFirebaseNowTimestamp(),
            bookingDate: {
              startDate: bookingPlaceData.startDate,
              endDate: bookingPlaceData.endDate 
            }
          })
          .then(() => console.log('Payment added'))
          .catch(error => console.log(error))

      })
      .then(() => console.log('Transaction completed'))
      .catch(error => {
        console.log('Transaction failed with error: ', error)
        throw new Error(`Transaction failed with error: ${error}`)
      })
  }

  return { book }
}

export default useBookingPlace
