import React from 'react'
import Filters from '../interfaces/Filters'
import PlaceData from '../interfaces/PlaceData'
import PlaceSnapshot from '../interfaces/PlaceSnapshot'
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

      for (let booking of placeData.bookings) {
        if (!booking.endDate) continue
        if (endDate > booking.startDate.toDate()) {
          return false
        }

        if (
          endDate >= booking.startDate.toDate() &&
          startDate <= booking.endDate.toDate()
        ) {
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
