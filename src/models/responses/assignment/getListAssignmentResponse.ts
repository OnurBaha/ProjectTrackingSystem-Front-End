import { Identifier } from "typescript";

export default interface GetListAssignmentResponse {
    id: Identifier;
    projectId: Identifier;
    projectName:string;
    title: string;
    description: string;
    creationDate: Date;
    status :string;
}