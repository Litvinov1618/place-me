import { Timestamp } from "@firebase/firestore-types"

const checkIsActualBooking = (startDate: Timestamp, endDate: Timestamp | null) => {
  const currentDate = Date.now()

  if (!endDate) {
    if (
      startDate.toMillis() <= currentDate && startDate.toDate().getDate() <= new Date(currentDate).getDate()
    ) return true
    return false
  }

  if (startDate.toMillis() <= currentDate && endDate.toMillis() >= currentDate) return true
  return false
}

export default checkIsActualBooking