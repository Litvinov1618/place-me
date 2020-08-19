import React from 'react'
import Navigation from './Navigation'
import Places from './Places'
import ReservePlace from './ReservePlace'
import Members from './Members'
import AddNewUser from './AddNewUser'
import ReservedPlaceInfo from './ReservedPlaceInfo'
import UserPage from './UserPage'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplate: '1fr 56px/100%',
  },
})

const App: React.FC = () => {
  const classes = useStyles()
  return (
    <Container disableGutters={true} maxWidth="xs" className={classes.root}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              RegisterPage
            </Route>
            <Route path="/places">
              <Places />
            </Route>
            <Route path="/members">
              <Members />
            </Route>
            <Route path="/new-user">
              <AddNewUser />
            </Route>
            <Route path="/user-page">
              <UserPage />
            </Route>
            <Route path="/reserve-place">
              <ReservePlace />
            </Route>
          </Switch>
          <Switch>
            <Route path="/reserved-place-info">
              <ReservedPlaceInfo />
            </Route>
          </Switch>
        </div>
        <Navigation />
      </Router>
    </Container>
  )
}

export default App
