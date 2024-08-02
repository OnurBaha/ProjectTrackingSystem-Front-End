import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetListAssignmentResponse from "../models/responses/assignment/getListAssignmentResponse";
import GetAssignmentResponse from "../models/responses/assignment/getAssignmentResponse";
import AddAssignmentRequest from "../models/requests/assignment/addAssignmentRequest";
import AddedAssignmentResponse from "../models/responses/assignment/addedAssignmentResponse";
import UpdateAssignmentRequest from "../models/requests/assignment/updateAssignmentRequest";
import UpdatedAssignmentResponse from "../models/responses/assignment/updatedAssignmentResponse";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import { AxiosResponse } from "axios";

class AssignmentService extends BaseService<
    Paginate<GetListAssignmentResponse>,
    GetAssignmentResponse,
    AddAssignmentRequest,
    AddedAssignmentResponse,
    UpdateAssignmentRequest,
    UpdatedAssignmentResponse> {
    constructor() {
        super();
        this.apiUrl = "Assignments";
    }

    getByProjectId(projectId: string,pageIndex:number, pageSize:number): Promise<AxiosResponse<Paginate<GetListAssignmentResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAssignmentResponse>>(this.apiUrl + '/GetByProjectId?projectId=' + projectId+'&pageIndex='+pageIndex+'&pageSize='+pageSize);
    }
}

export default new AssignmentService();