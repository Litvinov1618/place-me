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
    isFree: false,
    userName: 'Randy',
    dateRange: {
      firstDay: '1 Sep',
      lastDay: '5 Sep',
    },
    visitorsCount: 5,
  },
  {
    placeName: 'Place 2',
    isFree: true,
    userName: 'Randy',
    dateRange: {
      firstDay: '1 Sep',
      lastDay: '5 Sep',
    },
    visitorsCount: 5,
  },
  {
    placeName: 'Place 3',
    isFree: true,
    visitorsCount: 5,
  },
  {
    placeName: 'Place 4',
    isFree: true,
    visitorsCount: 5,
  },
  {
    placeName: 'Place 5',
    isFree: true,
    visitorsCount: 5,
  },
  {
    placeName: 'Place 6',
    isFree: true,
    visitorsCount: 5,
  },
  {
    placeName: 'Place 7',
    isFree: true,
    visitorsCount: 5,
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
            ({ placeName, isFree, userName, visitorsCount, dateRange }) => (
              <ListItem disableGutters key={placeName}>
                <PlaceCard
                  placeName={placeName}
                  isFree={isFree}
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
