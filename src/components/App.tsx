import React from 'react'
import Header from './Header'
import Navigation from './Navigation'
import Container from '@material-ui/core/Container'
import PlaceCard from './PlaceCard'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    minHeight: '712px',
    padding: '0px',
    display: 'grid',
    gridTemplate: '55px 1fr 56px/100%',
    maxWidth: '375px',
  },
})

const App: React.FC = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <Header headerText="Places" />
      <div>
        <PlaceCard
          placeName="Place 1"
          isFree={false}
          userEmail="randy@gmail.com"
          visitorsCount={2}
          dateRange="1 Sep - 2 Sep"
        />
        <PlaceCard placeName="Place 2" isFree={true} />
      </div>
      <Navigation />
    </Container>
  )
}

export default App
