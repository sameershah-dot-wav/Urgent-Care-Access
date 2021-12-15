import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { PatientsList, PatientsInsert, PatientsUpdate } from "../pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/patients/list" exact component={PatientsList} />
        <Route path="/patient/create" exact component={PatientsInsert} />
        <Route path="/patients/update/:id" exact component={PatientsUpdate} />
      </Switch>
    </Router>
  );
}

export default App;
