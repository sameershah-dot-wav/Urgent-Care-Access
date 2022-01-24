import React, {useState} from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { NavBar, Links } from "../components";


import {
  PatientsList,
  PatientsInsert,
  PatientsUpdate,
  SignUp,
  SignIn,
  Home,
  HospitalMap

} from "../pages";


function App() {

  const [token, setToken] = useState(localStorage.getItem("token"))

  

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/map" exact component={HospitalMap} />
          <div>
            
            {/* <Route exact path="">
              {token ? <Redirect to="/home"/> : <Redirect to="/signup" />}
            </Route> */}
            <NavBar />
            <Route path="/home" exact component={Home} />
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
