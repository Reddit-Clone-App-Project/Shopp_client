import axios from "axios";
const API = axios.create({baseURL: "http://localhost:3000" });

export const login = (eOrP: String, password: String) => API.post('/users/login', {
    eOrP,
    password
})

export const logout = () => API.post('/users/logout');