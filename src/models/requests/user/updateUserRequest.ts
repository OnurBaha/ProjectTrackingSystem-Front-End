import { Identifier } from "typescript";

export default interface UpdateUserRequest {
    id: Identifier;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}