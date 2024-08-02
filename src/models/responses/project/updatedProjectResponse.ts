import { Identifier } from 'typescript';
export default interface UpdatedProjectResponse {
    id: Identifier;
    name: string;
    startDate:Date;
    endDate:Date;
}