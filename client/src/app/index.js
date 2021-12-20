import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar } from "../components";

import {
  PatientsList,
  PatientsInsert,
  PatientsUpdate,
  SignUp,
  SignIn,
  Home,
} from "../pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={SignIn} />
          <div>
            <NavBar />
            <Route path="/" exact component={Home} />
            <Route path="/patients/list" exact component={PatientsList} />
            <Route path="/patient/create" exact component={PatientsInsert} />
            <Route
              path="/patients/update/:id"
              exact
              component={PatientsUpdate}
            />
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
