import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'


import styled from 'styled-components'

import 'react-table/react-table.css'


const Wrapper = styled.div`
padding: 0 40px 40px 40px`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

export function UpdatePatient (props) {

    function updateUser(e) {
        e.preventDefault() //tells user that if event does not get handled, its default
        //  action should not be taken as it normally should

       
        /**
         * window.location.href is the URL of the current page
         */
        window.location.href = `/patients/update/${props.id}` 
    }

    return(
        <Update onClick={updateUser}>Update</Update>
    )
}


export function DeletePatient (props) {

    function deleteUser(e) {
        e.preventDefault()

        if (
            window.confirm(
                `Do You want to delete the user ${props.id} permanently?` ,
            )
        ) {
            api.deletePatientById(props.id)
            window.location.reload()
        }
    }

    return(
        <Delete onClick={deleteUser}>Delete</Delete>            
    )
        
}



class PatientsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            patients: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllPatients().then(patients => {
            this.setState({
                patients: patients.data.data,
                isLoading: false,
            })
        })
    }

    

    render() {
        const { patients, isLoading } = this.state
        console.log('TCL: PatientsList -> render -> patients', patients)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Dob',
                accessor: 'dob',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeletePatient id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdatePatient id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!patients.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={patients}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default PatientsList