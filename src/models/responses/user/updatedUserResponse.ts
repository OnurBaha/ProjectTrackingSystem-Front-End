import { Identifier } from "typescript";

export default interface UpdatedUserResponse {
    id: Identifier;
    firstName: string;
    lastName: string;
    email: string;
}