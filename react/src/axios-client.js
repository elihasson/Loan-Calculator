import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/`
})

axiosClient.interceptors.request.use((config) => {
    // - for possible authentication implementation in the future
    // const token = localStorage.getItem('ACCESS_TOKEN')
    // config.headers.Authorization = `Bearer ${token}`
    return config
})

axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    const { response } = error

    console.log('error', response.status)
    throw error
})

export default axiosClient;

