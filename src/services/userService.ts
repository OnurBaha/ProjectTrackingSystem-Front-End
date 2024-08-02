import { AxiosResponse } from 'axios';
import axiosInstance from '../core/interceptors/axiosInterceptor';
import LoginResponse from '../models/responses/auth/loginResponse';
import RegisterRequest from '../models/requests/auth/registerRequest';
import LoginRequest from '../models/requests/auth/loginRequest';
import { BaseService } from '../core/services/baseService';
import GetListUserResponse from '../models/responses/user/getListUserResponse';
import GetUserResponse from '../models/responses/user/getUserResponse';
import AddUserRequest from '../models/requests/user/addUserRequest';
import AddedUserResponse from '../models/responses/user/addedUserResponse';
import UpdateUserRequest from '../models/requests/user/updateUserRequest';
import UpdatedUserResponse from '../models/responses/user/updatedUserResponse';
import { Paginate } from '../models/paginate';
class UserService extends BaseService<
    Paginate<GetListUserResponse>,
    GetUserResponse,
    AddUserRequest,
    AddedUserResponse,
    UpdateUserRequest,
    UpdatedUserResponse> {
    constructor() {
        super();
        this.apiUrl = "WorkHours";
    }

    loginUser(loginUserRequest: LoginRequest): Promise<AxiosResponse<LoginResponse, any>> {
        return axiosInstance.post<LoginResponse>(this.apiUrl + '/Login', loginUserRequest);
    }

    register(registerUserRequest: RegisterRequest): Promise<AxiosResponse<LoginResponse, any>> {
        return axiosInstance.post<LoginResponse>(this.apiUrl + '/Register', registerUserRequest);
    }

    getUserIdByEmail(email: string): Promise<AxiosResponse<number, any>> {
        return axiosInstance.get<number>(this.apiUrl + '/GetUserIdByEmail?email=' + email);
    }
}

export default new UserService();