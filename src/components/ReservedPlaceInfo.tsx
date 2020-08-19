import React from 'react'
import Header from './Header'
import Container from '@material-ui/core/Container'
import BookingTable from './BookingTable'

const rows = [
  { userName: 'Randy', dateRange: '1 Sep - 5 Sep', visitors: 5 },
  { userName: 'John', dateRange: '7 Sep - 9 Sep', visitors: 2 },
]

const PlaceInfo: React.FC = () => {
  return (
    <>
      <Header headerText="Place Info" previousPage="/places" />
      <Container>
        <BookingTable rows={rows} />
      </Container>
    </>
  )
}

export default PlaceInfo
