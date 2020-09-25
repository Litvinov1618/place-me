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

export type PlaceSnapshot = QueryDocumentSnapshot<PlaceData>

export interface BookingPlaceData {
  firstDay: number
  lastDay: number
  name: string
  amount: number
}

export interface Filters {
  minSeats: number
  dateRange?: {
    startDate: Date
    endDate: Date
  }
}

export interface BookingDateRange {
  startDate: Date
  endDate: Date
}

export interface PaymentData {
  paymentDate: Date;
    name: string;
    amount: number;
    book: {
        placeName: string;
        bookingDate: {
            firstDate: Date;
            lastDate: Date;
        };
    };
}
