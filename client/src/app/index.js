import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar } from "../components";

import { PatientsList, PatientsInsert, PatientsUpdate, SignUp, Home } from "../pages";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/patients/list" exact component={PatientsList} />
        <Route path="/patient/create" exact component={PatientsInsert} />
        <Route path="/patients/update/:id" exact component={PatientsUpdate} />
        <Route path="/sign-up" exact component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
