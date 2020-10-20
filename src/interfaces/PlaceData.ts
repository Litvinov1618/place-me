import BookingPlaceData from './BookingPlaceData'

interface PlaceData {
  name: string
  seats: number
  archived: boolean
  bookings: BookingPlaceData[]
}

export default PlaceData