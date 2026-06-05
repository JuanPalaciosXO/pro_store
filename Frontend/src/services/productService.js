import axios from "axios";

const API = "http://localhost:3000/api/v1"

const authHeader = (token) =>({
    headers : { Authorization : `Bearer ${token}`}
})

export const getProductsRequest = async () =>{
    const response = await axios.get(`${API}/products`)
    return response.data
}

export const createProductRequest = async (producto, token) =>{
    const response = await axios.post(`${API}/products`, producto, authHeader(token))
    return response.data
}

export const updateProductRequest = async (id, producto, token) =>{
    const response = await axios.put(`${API}/products/${id}`, producto, authHeader(token))
    return response.data
}

export const deleteProductRequest = async (id, producto, token) =>{
    const response = await axios.delete (`${API}/products/${id}`, producto, authHeader(token))
    return response.data
}



