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
        // Check this booking does not overlap with existing ones
        oldBookings.forEach(book => {
          if (!bookingPlaceData.endDate) {
            if (!book.endDate) {
              throw new Error('This place already has an infinite booking')
            } else if (book.endDate >= bookingPlaceData.startDate) {
              throw new Error('This place is already have booked at this time')
            }
          }

          if (book.endDate) {
            if (
              book.endDate >= bookingPlaceData.startDate &&
              book.startDate <= bookingPlaceData.endDate!
            ) {
              throw new Error('This place is already have booked at this time')
            }
          } else if (book.startDate < bookingPlaceData.endDate! ) {
            throw new Error('This place is already have booked at this time')
          }

        })

        await collection
          .doc(placeId)
          .update({ bookings: [...oldBookings, bookingPlaceData] })
          .then(() => console.log('Booking added'))
          .catch(error => console.log(error))

        await add({
            ...bookingPlaceData,
            paymentDate: Timestamp.now(),
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
