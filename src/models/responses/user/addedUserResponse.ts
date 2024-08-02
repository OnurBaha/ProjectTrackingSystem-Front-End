import { Identifier } from "typescript";

export default interface AddedUserResponse {
    id: Identifier;
    firstName: string;
    lastName: string;
    email: string;
}