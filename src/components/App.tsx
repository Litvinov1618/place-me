import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import Places from './Places'
import Payments from './Payments'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Link style={{fontSize: '40px'}} to='/places'>Places </Link>
          <Link style={{fontSize: '40px'}} to='/payments'>Payments</Link>
        </Route>
        <Route path='/places'>
          <Places />
        </Route>
        <Route path='/payments'>
          <Payments />
        </Route>
      </Switch>
    </Router>
  )
  
  
}

export default App
