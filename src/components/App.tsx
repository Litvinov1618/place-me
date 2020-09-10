import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import Places from './Places'
import AddPlace from './AddPlace'
import EditPlace from './EditPlace'
import useCollectionPlaces from './Firebase/useCollectionPlaces'

const App: React.FC = () => {
  const { places, addPlace, deletePlace, editPlace } = useCollectionPlaces()

  return (
    <Router>
      <Switch>
        <Route exact path="/places">
          <Places places={places} deletePlace={deletePlace} />
        </Route>
        <Route exact path="/places/add">
          <AddPlace addPlace={addPlace} />
        </Route>
        <Route exact path="/places/:id/edit">
          <EditPlace editPlace={editPlace} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
