import { QueryDocumentSnapshot } from '@firebase/firestore-types'

export interface PlaceData {
  name: string
  seats: number
  archived: boolean
  bookings: BookingPlaceData[]
}

export interface EditPlaceData {
  name?: string
  seats?: number
}

export interface AddPlaceData {
  name: string
  seats: number
}

export type IPlaceSnapshot = QueryDocumentSnapshot<PlaceData>

export interface BookingPlaceData {
  firstDay: number
  lastDay: number
  name: string
  amount: number
}
