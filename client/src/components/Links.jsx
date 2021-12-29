import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collapse navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collapse navbar-collapse',
})``

export default function Links() {
    
    return (
        <React.Fragment>
            <Link to="/" className="navbar-brand">
                Urgent Care Access
            </Link>
            <Collapse>
                <List>
                    <Item>
                        <Link to="/patients/list" className="nav-link">
                            List Of Patients
                        </Link>
                    </Item>
                    <Item>
                        <Link to="/patient/create" className="nav-link">
                            New Patient
                        </Link>
                    </Item>
                </List>
            </Collapse>
        </React.Fragment>
    )
}