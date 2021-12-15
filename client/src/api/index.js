import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertPatient = payload => api.post(`/patient`, payload)
export const getAllPatients = () => api.get(`/patients`)
export const deletePatientById = id => api.delete(`/patient/${id}`)
export const updatePatientById = (id, payload) => api.put(`/patient/${id}`, payload)
export const getPatientById = id => api.get(`/patient/${id}`)


const apis = {
    getAllPatients,
    deletePatientById,
    insertPatient,
    updatePatientById,
    getPatientById,
}


export default apis