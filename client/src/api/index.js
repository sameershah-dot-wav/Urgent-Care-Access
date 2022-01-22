import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

axios.defaults.withCredentials = true;

export const insertPatient = payload => api.post(`/patient`, payload)
export const getAllPatients = () => api.get(`/patients`)
export const deletePatientById = id => api.delete(`/patient/${id}`)
export const updatePatientById = (id, payload) => api.put(`/patient/${id}`, payload)
export const getPatientById = id => api.get(`/patient/${id}`)

export const insertHospital = payload => api.post(`/hospital/create`, payload)
export const getAllHospitals = payload => api.get(`/hospitals`)
export const loginHospital = payload => api.post("/hospital/login", payload)
export const getLoggedInHospital = token => api.get(`/hospital/me`, { headers: {'token': token}})




const apis = {
    getAllPatients,
    deletePatientById,
    insertPatient,
    updatePatientById,
    getPatientById,
    insertHospital,
    getAllHospitals,
    loginHospital,
    getLoggedInHospital,
}


export default apis