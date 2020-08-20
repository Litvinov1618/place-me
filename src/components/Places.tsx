import React, { useState } from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import {
  List,
  ListItem,
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core'
import Header from './Header'
import PlaceCard from './PlaceCard'
import DateFnsUtils from '@date-io/date-fns'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'

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
  const [firstDay, setFirstDay] = useState<MaterialUiPickersDate>(null)
  const [lastDay, setLastDay] = useState<MaterialUiPickersDate>(null)

  const handleFirstAndLastDayChange = (value: Date | null) => {
    setFirstDay(value)
    setLastDay(value)
  }

  const [seats, setSeats] = useState('')

  const handleSeatsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSeats(event.target.value as string)
  }
  return (
    <>
      <Header headerText="Places" />
      <Container>
        <Grid container justify="space-around">
          <Grid item xs={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                autoOk
                label="First Day"
                onChange={handleFirstAndLastDayChange}
                value={firstDay}
                placeholder="FirstDay"
              ></DatePicker>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                autoOk
                label="Last Day"
                onChange={setLastDay}
                value={lastDay}
              ></DatePicker>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Seats</InputLabel>
              <Select value={seats} onChange={handleSeatsChange}>
                <MenuItem value={1}>1+</MenuItem>
                <MenuItem value={2}>2+</MenuItem>
                <MenuItem value={3}>3+</MenuItem>
                <MenuItem value={4}>4+</MenuItem>
                <MenuItem value={5}>5+</MenuItem>
                <MenuItem value={6}>6+</MenuItem>
                <MenuItem value={7}>7+</MenuItem>
                <MenuItem value={8}>8+</MenuItem>
              </Select>
            </FormControl>
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
    </>
  )
}

export default Places
