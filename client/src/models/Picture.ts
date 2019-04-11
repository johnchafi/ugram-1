import User from "./User";

export default interface Picture {
    "id"?: number,
    "createdDate"?: number,
    "description"?: string,
    "mentions"?: string[],
    "tags"?: string[],
    "url"?: {
        150? : string
        40? : string
        50? : string
        "300"? : string
        original? : string
    },
    "userId"?: string,
    user?: User,
    file?: File,
}
