import { Identifier } from "typescript";

export default interface UpdateAssignmentRequest {
    id:string;
    projectId: Identifier;
    title: string;
    description: string;
    creationDate: Date;
    status : string;
}