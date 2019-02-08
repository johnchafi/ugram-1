import User from "./User";
export default interface Picture {
    "id": number;
    "createdDate": number;
    "description": string;
    "mentions": string[];
    "tags": string[];
    "url": string;
    "userId": string;
    user: User;
}
