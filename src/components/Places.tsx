import React from 'react'
import PlaceCard from './PlaceCard'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Header from './Header'
import Container from '@material-ui/core/Container'

const testPlaces = [
  {
    placeName: 'Place 1',
    isFree: false,
    userEmail: 'randy@gmail.com',
    dateRange: {
      firstDay: '1 Sep',
      lastDay: '5 Sep',
    },
    visitorsCount: 5,
  },
  {
    placeName: 'Place 2',
    isFree: true,
    userEmail: 'randy@gmail.com',
    dateRange: {
      firstDay: '1 Sep',
      lastDay: '5 Sep',
    },
    visitorsCount: 5,
  },
  {
    placeName: 'Place 3',
    isFree: true,
  },
  {
    placeName: 'Place 4',
    isFree: true,
  },
  {
    placeName: 'Place 5',
    isFree: true,
  },
  {
    placeName: 'Place 6',
    isFree: true,
  },
  {
    placeName: 'Place 7',
    isFree: true,
  },
]

const Places: React.FC = () => {
  return (
    <div>
      <Header headerText="Places" />
      <Container>
        <List>
          {testPlaces.map(
            ({ placeName, isFree, userEmail, visitorsCount, dateRange }) => (
              <ListItem disableGutters key={placeName}>
                {isFree ? (
                  <PlaceCard placeName={placeName} isFree={isFree} />
                ) : (
                  <PlaceCard
                    placeName={placeName}
                    isFree={isFree}
                    userEmail={userEmail}
                    visitorsCount={visitorsCount}
                    dateRange={dateRange}
                  />
                )}
              </ListItem>
            )
          )}
        </List>
      </Container>
    </div>
  )
}

export default Places
