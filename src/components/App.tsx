import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import Places from './Places'
import AddPlace from './AddPlace'
import EditPlace from './EditPlace'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/places">
          <Places />
        </Route>
        <Route exact path="/places/add">
          <AddPlace />
        </Route>
        <Route exact path="/places/:id/edit">
          <EditPlace />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
