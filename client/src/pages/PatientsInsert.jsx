import React, { useState } from "react";
import api from "../api";

import styled from "styled-components";

const Title = styled.h1.attrs({
  className: "h1",
})``;

const Wrapper = styled.div.attrs({
  className: "form-group",
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: "form-control",
})`
  margin: 5px;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 15px;
`;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 15px;
`;

export default function PatientsInsert() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");

  async function handleChangeInputFirstName(e) {
    const firstName = e.target.value;
    setFirstName(firstName);
  }

  async function handleChangeInputLastName(e) {
    const lastName = e.target.value;
    setLastName(lastName);
  }

  async function handleChangeInputDob(e) {
    const dob = e.target.value;
    setDob(dob);
  }

  async function handleIncludePatient() {
    const payload = { firstName, lastName, dob };

    await api.insertPatient(payload).then((res) => {
      window.alert(`Patient Inserted Successfully`);
      setFirstName("");
      setLastName("");
      setDob("");

      console.log(lastName);
    });
  }

  return (
    <Wrapper>
      <Title>Create Patient</Title>

      <Label>First Name: </Label>
      <InputText
        type="text"
        value={firstName}
        onChange={handleChangeInputFirstName}
      />

      <Label>Last Name: </Label>
      <InputText
        type="text"
        value={lastName}
        onChange={handleChangeInputLastName}
      />

      <Label>Dob: </Label>
      <InputText type={Date} value={dob} onChange={handleChangeInputDob} />

      <Button onClick={handleIncludePatient}> Add Patient </Button>
      <CancelButton href={"/patients/list"}> Cancel </CancelButton>
    </Wrapper>
  );
}
