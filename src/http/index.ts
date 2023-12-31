import axios, { AxiosInstance } from 'axios'

const clienteHttp: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/"
})
//pega uma instancia do axios

export default clienteHttp

