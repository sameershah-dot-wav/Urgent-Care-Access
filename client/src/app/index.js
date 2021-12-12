import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { PatientsList } from '../pages'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/patients/list" exact component={PatientsList} />
      </Switch>
    </Router>
  )
}

export default App