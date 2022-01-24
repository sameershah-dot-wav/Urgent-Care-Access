import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import api from "../api";

import styled from "styled-components";

import "react-table/react-table.css";

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;

const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`;

export function UpdatePatient(props) {
  function updateUser(e) {
    e.preventDefault(); //tells user that if event does not get handled, its default
    //  action should not be taken as it normally should

    /**
     * window.location.href is the URL of the current page
     */
    window.location.href = `/patients/update/${props.id}`;
  }

  return <Update onClick={updateUser}>Update</Update>;
}

export function DeletePatient(props) {
  function deleteUser(e) {
    e.preventDefault();

    if (
      window.confirm(`Do You want to delete the user ${props.id} permanently?`)
    ) {
      api.deletePatientById(props.id);
      window.location.reload();
    }
  }

  return <Delete onClick={deleteUser}>Delete</Delete>;
}

export default function PatientsList() {
  const [patients, setPatients] = useState([]);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();

    async function fetchData() {
      setLoading(true);

      const response = await api.getAllPatients();

      const data = response.data;

      setPatients(data);

      console.log(patients);
    }
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [patients]);

  const columns = [
    {
      Header: "ID",
      accessor: "_id",
      filterable: true,
    },
    {
      Header: "First Name",
      accessor: "firstName",
      filterable: true,
    },
    {
      Header: "Last Name",
      accessor: "lastName",
      filterable: true,
    },
    {
      Header: "Dob",
      accessor: "dob",
      filterable: true,
    },
    {
      Header: "",
      accessor: "",
      Cell: function (props) {
        return (
          <span>
            <DeletePatient id={props.original._id} />
          </span>
        );
      },
    },
    {
      Header: "",
      accessor: "",
      Cell: function (props) {
        return (
          <span>
            <UpdatePatient id={props.original._id} />
          </span>
        );
      },
    },
  ];

  let showTable = true;
  

  return (
    <Wrapper>
      {showTable && (
        <ReactTable
          data={patients.data}
          columns={columns}
          loading={isLoading}
          defaultPageSize={10}
          showPageSizeOptions={true}
          minRows={0}
        />
      )}
    </Wrapper>
  );
}
