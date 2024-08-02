import { Identifier } from "typescript";

export default interface AddedAssignmentResponse {
    id: Identifier;
    projectId: Identifier;
    title: string;
    description: string;
    creationDate: Date;
    status :string;
}