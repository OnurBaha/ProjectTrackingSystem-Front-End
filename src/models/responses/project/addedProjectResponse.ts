import { Identifier } from 'typescript';
export default interface AddedProjectResponse {
    id: Identifier;
    name: string;
    startDate:Date;
    endDate:Date;
}