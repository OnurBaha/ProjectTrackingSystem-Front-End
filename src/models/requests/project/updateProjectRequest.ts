import { Identifier } from 'typescript';
export default interface UpdateProjectRequest {
    id: string;
    name: string;
    startDate:Date;
    endDate:Date;
}