import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { PatientsList, PatientsInsert } from '../pages'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/patients/list" exact component={PatientsList} />
        <Route path="/patient/create" exact component={PatientsInsert}/>
      </Switch>
    </Router>
  )
}

export default App