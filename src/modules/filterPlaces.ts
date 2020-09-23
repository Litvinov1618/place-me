import { PlaceData } from "../interfaces"

const filterPlaces = (placeData: PlaceData, seats: string) => {
  if(placeData.seats >= seats) {
    return true
  }
}

export default filterPlaces