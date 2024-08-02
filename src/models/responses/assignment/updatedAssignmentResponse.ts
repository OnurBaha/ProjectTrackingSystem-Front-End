import { Identifier } from "typescript";

export default interface UpdatedAssignmentResponse {
    id: Identifier;
    projectId: Identifier;
    projectName: string;
    title: string;
    description: string;
    creationDate: Date;
    status :string;
}