import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import Places from './Places'
import AddPlace from './AddPlace'
import PlaceDetails from './PlaceDetails'
import EditPlace from './EditPlace'
import useCollectionPlaces from './Firebase/useCollectionPlaces'

const App: React.FC = () => {
  const { places, addPlace, deletePlace } = useCollectionPlaces()

  return (
    <Router>
      <Switch>
        <Route exact path="/places">
          <Places places={places} deletePlace={deletePlace} />
        </Route>
        <Route exact path="/places/add">
          <AddPlace addPlace={addPlace} />
        </Route>
        <Route exact path="/places/:id">
          <PlaceDetails />
        </Route>
        <Route exact path="/places/place1/edit">
          <EditPlace />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
