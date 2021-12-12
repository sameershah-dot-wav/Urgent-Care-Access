import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const getAllPatients = () => api.get(`/patients`)
export const deletePatientById = id => api.delete(`/patient/${id}`)



const apis = {
    getAllPatients,
    deletePatientById
}

export default apis