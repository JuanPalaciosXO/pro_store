import axios from "axios";

const API = "http://localhost:3000/api/v1"

export const loginRequest = async (correo_cliente, password) =>{
    const response = await axios.post(`${API}/login`, {
        correo_cliente,
        password
    })
    return response.data;
}

export const registerRequest = async (datos) =>{
    const response = await axios.post(`${API}/register`, datos)
    return response.data;
}