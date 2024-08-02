import { Identifier } from "typescript";

export default interface AddAssignmentRequest {
    projectId: Identifier;
    title: string;
    description: string;
    creationDate: Date;
    status : string;
}