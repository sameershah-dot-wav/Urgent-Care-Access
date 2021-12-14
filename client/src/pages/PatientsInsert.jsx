import React, {useState} from 'react'
import api from '../api'

import styled from 'styled-components'



const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 15px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 15px;
`

export default function PatientsInsert(props) {

    const [name, setName] = useState('')
    const [dob, setDob] = useState('')


        async function handleChangeInputName(e) {
            const name = e.target.value
            setName(name)
        }

        
        async function handleChangeInputDob(e) {
            const dob = e.target.value
            setDob(dob)
        }


        async function handleIncludePatient() {
            const payload = {name, dob}

            await api.insertPatient(payload).then(res => {
                window.alert(`Patient Inserted Successfully`)
                setName('')
                setDob('')
            })
        }


    return(
        <Wrapper>
            <Title>Create Patient</Title>

            <Label>Name: </Label>
            <InputText
                type="text"
                value={name}
                onChange={handleChangeInputName} 
            />

            <Label>Dob: </Label>
            <InputText
            type={Date}
            value={dob}
            onChange={handleChangeInputDob}
            />

            <Button onClick={handleIncludePatient}> Add Patient </Button>
            <CancelButton href={'/patients/list'}> Cancel </CancelButton>
        </Wrapper>
    )

}



