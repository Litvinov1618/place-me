import { PlaceData } from '../interfaces'

const verifyPlace = (placeData: PlaceData, seats: number, firstDay: Date | null, lastDay: Date | null) => {
  if (placeData.seats < seats) {
    return false
  }

  if (firstDay && lastDay) {
    for (let book of placeData.bookings) {
      if (firstDay.getTime() < book.lastDay && lastDay.getTime() > book.firstDay) {
        return false
      }
    }
  }

  return true
}

export default verifyPlace
