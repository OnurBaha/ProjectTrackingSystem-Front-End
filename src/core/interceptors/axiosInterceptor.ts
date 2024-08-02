import axios from "axios";
import { BASE_API_URL } from "../../environment/environment";


import { handleError } from "../errorHandlers/errorHandlers";

const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
});


axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        handleError(error);
        return error;
    },
);

export default axiosInstance;