import React from 'react'
import { PlaceData, PlaceSnapshot, Filters } from '../interfaces'
import PlaceCard from './PlaceCard'

interface PlaceListProps {
  places: PlaceSnapshot[]
  filters: Filters
}

const PlaceList: React.FC<PlaceListProps> = ({ places, filters }) => {
  const verifyPlace = (placeData: PlaceData, { minSeats, dateRange }: Filters) => {
    if (placeData.seats < minSeats) {
      return false
    }

    if (dateRange) {
      const { startDate, endDate } = dateRange

      for (let book of placeData.bookings) {
        if (startDate <= book.endDate.toDate() && endDate >= book.startDate.toDate()) {
          return false
        }
      }
    }
  
    return true
  }

  return (
    <>
      {places
        .filter(place => verifyPlace(place.data(), filters))
        .map((place: PlaceSnapshot) => <PlaceCard key={place.id} placeData={place.data()} placeId={place.id} />)
      }
    </>
  )
}

export default PlaceList
