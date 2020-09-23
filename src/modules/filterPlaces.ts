import { PlaceData } from "../interfaces"

const filterPlaces = (placeData: PlaceData, seats: string, firstDay: Date | null, lastDay: Date | null) => {
  if (firstDay && lastDay) {
    for (let book of placeData.bookings) {
      if (firstDay.getTime() < book.lastDay && lastDay.getTime() > book.firstDay) {
        return false
      }
    }
  }

  if (placeData.seats < seats) {
    return false
  }

  return true
}

export default filterPlaces
