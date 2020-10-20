import { Timestamp } from '@firebase/firestore-types'
import FiniteTimestampRange from './FiniteTimestampRange'

interface PaymentData {
  paymentDate: Timestamp
  visitorName: string
  placeName: string
  amount: number
  paidDays: FiniteTimestampRange
  bookingDate: {
    startDate: Timestamp
    endDate: Timestamp | null
  }
}

export default PaymentData