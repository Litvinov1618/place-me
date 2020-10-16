import { Timestamp } from '@firebase/firestore-types'

interface FiniteTimestampRange {
  startDate: Timestamp
  endDate: Timestamp
}

export default FiniteTimestampRange