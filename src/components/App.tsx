import React from 'react'
import Header from './Header'
import Navigation from './Navigation'
import PlaceCard from './PlaceCard'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

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
      <Router>
        <Header headerText="Places" />
        <div>
          <Switch>
            <Route path="/places">
              <PlaceCard
                placeName="Place 1"
                isFree={false}
                userEmail="randy@gmail.com"
                visitorsCount={2}
                dateRange="1 Sep - 2 Sep"
              />
              <PlaceCard placeName="Place 2" isFree={true} />
            </Route>
            <Route path="/members">Members</Route>
            <Route path="/settings">Settings</Route>
          </Switch>
        </div>
        <Navigation />
      </Router>
    </Container>
  )
}

export default App
