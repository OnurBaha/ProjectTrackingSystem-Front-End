import { AxiosResponse } from "axios";
import axiosInstance from "../interceptors/axiosInterceptor";

export class BaseService<
    GetAllType,
    GetByIdType,
    AddRequestType,
    AddResponseType,
    UpdateRequestType,
    UpdateResponseType> {

    public apiUrl: string;

    constructor() {
        this.apiUrl = "";
    }

    getAll(pageIndex: number, pageSize: number): Promise<AxiosResponse<GetAllType, any>> {
        return axiosInstance.get<GetAllType>(this.apiUrl + "/GetList?PageIndex=" + pageIndex + "&PageSize=" + pageSize);
    }

    getById(id: string): Promise<AxiosResponse<GetByIdType, any>> {
        return axiosInstance.get<GetByIdType>(this.apiUrl + "/GetById?id=" + id);
    }

    add(request: AddRequestType): Promise<AxiosResponse<AddResponseType, any>> {
        return axiosInstance.post<AddResponseType>(this.apiUrl, request);
    }

    update(request: UpdateRequestType): Promise<AxiosResponse<UpdateResponseType, any>> {
        return axiosInstance.put<UpdateResponseType>(this.apiUrl, request);
    }

    delete(id: any) {
        return axiosInstance.delete(this.apiUrl + "?id=" + id);
    }
}