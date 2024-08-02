import { Identifier } from "typescript";

export default interface GetAssignmentResponse {
    id: Identifier;
    projectId: string;
    title: string;
    description: string;
    creationDate: Date;
    status :string;
}