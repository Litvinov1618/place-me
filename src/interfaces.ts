import { QueryDocumentSnapshot, Timestamp } from '@firebase/firestore-types'

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

export type PlaceSnapshot = QueryDocumentSnapshot<PlaceData>

export interface BookingPlaceData {
  startDate: Timestamp
  endDate: Timestamp | null
  visitorName: string
  placeName: string
  amount: number
  paidDays: FiniteTimestampRange
}

export interface Filters {
  minSeats: number
  dateRange?: FiniteDateRange
}

export interface FiniteDateRange {
  startDate: Date
  endDate: Date
}

export interface FiniteTimestampRange {
  startDate: Timestamp
  endDate: Timestamp
}

export interface PaymentData {
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

export type PaymentSnapshot = QueryDocumentSnapshot<PaymentData>