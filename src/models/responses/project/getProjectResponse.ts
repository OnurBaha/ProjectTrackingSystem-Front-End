import { Identifier } from 'typescript';
export default interface GetProjectResponse {
    id: Identifier;
    name: string;
    startDate:Date;
    endDate:Date;
}