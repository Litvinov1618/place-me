import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import PlacesPage from './PlacesPage'
import PaymentsPage from './PaymentsPage'
import MembersPage from './MembersPage'
import styled from 'styled-components'

const LinksWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  & > a {
    font-size: 40px;
    margin-right: 15px;
  }
`

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <LinksWrapper>
            <Link to='/places'>Places </Link>
            <Link to='/payments'>Payments</Link>
            <Link to='/members'>Members</Link>
          </LinksWrapper>
        </Route>
        <Route path='/places'>
          <PlacesPage />
        </Route>
        <Route path='/payments'>
          <PaymentsPage />
        </Route>
        <Route path='/members'>
          <MembersPage />
        </Route>
      </Switch>
    </Router>
  )
  
  
}

export default App
