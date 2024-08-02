import { Identifier } from "typescript";

export default interface AddUserRequest {
    id: Identifier;
    firstName: string;
    lastName: string;
    email: string;
}