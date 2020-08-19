import React from 'react'
import PlaceCard from './PlaceCard'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Header from './Header'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const testPlaces = [
  {
    placeName: 'Place 1',
    isAvailable: false,
    userName: 'Randy',
    dateRange: {
      firstDay: '1 Sep',
      lastDay: '5 Sep',
    },
    visitorsCount: 5,
  },
  {
    placeName: 'Place 2',
    isAvailable: true,
    userName: 'John',
    dateRange: {
      firstDay: '1 Sep',
      lastDay: '5 Sep',
    },
    visitorsCount: 4,
  },
  {
    placeName: 'Place 3',
    isAvailable: true,
    visitorsCount: 6,
  },
  {
    placeName: 'Place 4',
    isAvailable: true,
    visitorsCount: 5,
  },
  {
    placeName: 'Place 5',
    isAvailable: true,
    visitorsCount: 8,
  },
  {
    placeName: 'Place 6',
    isAvailable: true,
    visitorsCount: 2,
  },
  {
    placeName: 'Place 7',
    isAvailable: true,
    visitorsCount: 6,
  },
]

const Places: React.FC = () => {
  return (
    <div>
      <Header headerText="Places" />
      <Container>
        <Grid container justify="space-around">
          <Grid item xs={3}>
            <Select value="Seats: 1">
              <MenuItem value="Seats: 1">First Day</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={3}>
            <Select value="Seats: 1">
              <MenuItem value="Seats: 1">Last Day</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={3}>
            <Select value="Seats: 1">
              <MenuItem value="Seats: 1">Seats: 1</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <List>
          {testPlaces.map(
            ({
              placeName,
              isAvailable,
              userName,
              visitorsCount,
              dateRange,
            }) => (
              <ListItem disableGutters key={placeName}>
                <PlaceCard
                  placeName={placeName}
                  isAvailable={isAvailable}
                  userName={userName}
                  visitorsCount={visitorsCount}
                  dateRange={dateRange}
                />
              </ListItem>
            )
          )}
        </List>
      </Container>
    </div>
  )
}

export default Places
