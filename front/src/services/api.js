import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    // baseURL: 'https://back.anakim.space/',
    withCredentials: true,
});

export default apiClient;