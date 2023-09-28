import axios from "axios";

const instance = axios.create({
    baseURL: 'https://back-end-login.onrender.com/api',
    withCredentials: true
});

//http://localhost:4000/api

export default instance;

