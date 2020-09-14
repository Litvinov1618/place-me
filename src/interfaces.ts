import { QueryDocumentSnapshot } from '@firebase/firestore-types'

export interface PlaceData {
  name: string
  seats: number
  archived: boolean
}

export interface EditPlaceData {
  name?: string
  seats?: number
}

export interface AddPlaceData {
  name: string
  seats: number
}

export type IPlaceCollection = QueryDocumentSnapshot<PlaceData>
