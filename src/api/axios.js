import axios from "axios";

const adminURL = "https://swarupapp.in/api/"

export const baseURL  = adminURL
let axiosInstance = axios.create({
    baseURL,
})

export default axiosInstance;