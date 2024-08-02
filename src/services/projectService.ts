import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddProjectRequest from "../models/requests/project/addProjectRequest";
import UpdateProjectRequest from "../models/requests/project/updateProjectRequest";
import AddedProjectResponse from "../models/responses/project/addedProjectResponse";
import GetListProjectResponse from "../models/responses/project/getListProjectResponse";
import GetProjectResponse from "../models/responses/project/getProjectResponse";
import UpdatedProjectResponse from "../models/responses/project/updatedProjectResponse";



class ProjectService extends BaseService<
    Paginate<GetListProjectResponse>,
    GetProjectResponse,
    AddProjectRequest,
    AddedProjectResponse,
    UpdateProjectRequest,
    UpdatedProjectResponse> {
    constructor() {
        super()
        this.apiUrl = "Projects"
    }

}

export default new ProjectService();