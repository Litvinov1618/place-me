import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navigation from './Navigation'
import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import CreatePlace from './CreatePlace'

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="places/create">
          <CreatePlace />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
