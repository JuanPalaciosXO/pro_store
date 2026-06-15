import axios from "axios";
import ProductosPage from "../pages/ProductosPage";

const API = "http://localhost:3000/api/v1"

const authHeader = (token) => ({
    headers: {Authorization: `Bearer ${token}`}
})

export const createOrderRequest = async (productos, token) =>{
    const response = await axios.post(`${API}/orders`, {productos}, authHeader(token))
    return response.data
}

export const getOrderRequest = async (token) =>{
    const response = await axios.get(`${API}/orders `, authHeader(token))
    return response.data.orders
}

export const updateOrderRequest = async (id, estado, token) =>{
    const response = await axios.patch(`${API}/orders/${id}/status`, {estado}, authHeader(token))
    return response.data
}