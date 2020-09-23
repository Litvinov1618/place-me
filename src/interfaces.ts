import { DateRange } from '@blueprintjs/datetime/lib/esm/common/dateRange'
import { QueryDocumentSnapshot } from '@firebase/firestore-types'

export interface PlaceData {
  name: string
  seats: string
  archived: boolean
  bookings: BookingPlaceData[]
}

export interface EditPlaceData {
  name?: string
  seats?: string
}

export interface AddPlaceData {
  name: string
  seats: string
}

export type IPlaceCollection = QueryDocumentSnapshot<PlaceData>

export interface BookingPlaceData {
  firstDay: number
  lastDay: number
  name: string
  amount: number
}