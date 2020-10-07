import { useState } from 'react'
import firestoreCollection from './firestoreCollection'
import { BookingPlaceData } from '../interfaces'
import firebase from './firebase'
import usePaymentsCollection from '../modules/usePaymentsCollection'

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
          paymentDate: new Date().getTime(),
          visitorName: bookingPlaceData.visitorName,
          placeName: bookingPlaceData.placeName,
          amount: bookingPlaceData.amount,
          bookingDate: {
            firstDay: bookingPlaceData.firstDay,
            lastDay: bookingPlaceData.lastDay
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
