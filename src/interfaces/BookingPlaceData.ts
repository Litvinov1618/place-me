import { Timestamp } from '@firebase/firestore-types'
import FiniteTimestampRange from './FiniteTimestampRange'

interface BookingPlaceData {
  startDate: Timestamp
  endDate: Timestamp | null
  visitorName: string
  visitorId: string
  placeName: string
  amount: number
  paidDays: FiniteTimestampRange
}

export default BookingPlaceData