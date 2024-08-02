import { Identifier } from "typescript";

export default interface GetListUserResponse {
    id: Identifier;
    firstName: string;
    lastName: string;
    email: string;
    roleName: string;
}