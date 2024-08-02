import LoginRequest from "../models/requests/auth/loginRequest";
import { AxiosResponse } from "axios";
import LoginResponse from "../models/responses/auth/loginResponse";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import tokenService from "../core/services/tokenService";
import { jwtDecode } from "jwt-decode";
import RegisterRequest from "../models/requests/auth/registerRequest";
import RegisterResponse from "../models/responses/auth/registerResponse";
import { toast } from "react-toastify";

interface TokenDetails {
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
    email: string;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
}


class AuthService {
    login(request: LoginRequest): Promise<AxiosResponse<LoginResponse, any>> {
        return axiosInstance.post<LoginResponse>("Auth/Login", request);
    }

    register(request: RegisterRequest): Promise<AxiosResponse<RegisterResponse, any>> {
        return axiosInstance.post<RegisterResponse>("Auth/Register", request);
    }

    getUserInfo(): any {
        const token = tokenService.getToken();

        if (!token) {
            return null;
        }

        const tokenDetails: TokenDetails = jwtDecode(token);
        const {
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': userId,
            email,
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': name,
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': role
        } = tokenDetails;

        let nameParts = name.split(' ');

        let firstname = nameParts[0];
        let lastname = nameParts.slice(1).join(' ');

        const user: any = {
            id: userId,
            firstName: firstname,
            lastName: lastname,
            email: email
        };

        return user;
    }

    passwordReset(email: string): Promise<AxiosResponse<boolean, any>> {
        return axiosInstance.get<boolean>("Auth/PasswordReset?email=" + email);
    }

    logoutUser = () => {
        tokenService.removeToken();
        toast.success("Çıkış yapıldı");
    }


}

export default new AuthService()