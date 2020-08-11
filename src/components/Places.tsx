import React from 'react'
import PlaceCard from './PlaceCard'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Header from './Header'

const testPlaces = [
  {
    placeName: 'Place 1',
    isFree: false,
    userEmail: 'randy@gmail.com',
    dateRange: '1 Sep - 5 Sep',
    visitorsCount: 5,
  },
  {
    placeName: 'Place 2',
    isFree: true,
    userEmail: 'randy@gmail.com',
    dateRange: '1 Sep - 5 Sep',
    visitorsCount: 5,
  },
  {
    placeName: 'Place 3',
    isFree: true,
    userEmail: '',
    dateRange: '',
    visitorsCount: 0,
  },
  {
    placeName: 'Place 3',
    isFree: true,
    userEmail: '',
    dateRange: '',
    visitorsCount: 0,
  },
  {
    placeName: 'Place 3',
    isFree: true,
    userEmail: '',
    dateRange: '',
    visitorsCount: 0,
  },
  {
    placeName: 'Place 3',
    isFree: true,
    userEmail: '',
    dateRange: '',
    visitorsCount: 0,
  },
  {
    placeName: 'Place 3',
    isFree: true,
    userEmail: '',
    dateRange: '',
    visitorsCount: 0,
  },
]

const Places: React.FC = () => {
  return (
    <div>
      <Header headerText="Places" />
      <GridList cellHeight="auto" cols={1} spacing={10}>
        {testPlaces.map(
          ({ placeName, isFree, userEmail, visitorsCount, dateRange }) => (
            <GridListTile>
              <PlaceCard
                placeName={placeName}
                isFree={isFree}
                userEmail={userEmail}
                visitorsCount={visitorsCount}
                dateRange={dateRange}
              />
            </GridListTile>
          )
        )}
      </GridList>
    </div>
  )
}

export default Places
