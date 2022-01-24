import React, { Component } from "react";
import styled from "styled-components";

import Links from "./Links";

import "bootstrap/dist/css/bootstrap.min.css";

const Container = styled.div.attrs({
  className: "container-fluid",
})`padding 0px`;

const Nav = styled.nav.attrs({
  className: "navbar navbar-expand-lg navbar-dark bg-dark",
})`
    margin-bottom 20 px;
`;

function refreshPage() {
  window.location.reload(false);
}


export default function NavBar() {
  return (
    <Container>
      <Nav>
        <Links />
        <button onClick={localStorage.removeItem("token"), refreshPage}>Logout</button>
      </Nav>
    </Container>
  );
}
