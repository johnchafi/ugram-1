export interface Comment {
    message: string;
    userId: string;
    id: number,
    pictureId: number
    ownerId: string
}

export class CommentUser implements Comment {
    message: string;
    userId: string;
    id: number;
    pictureId: number;
    ownerId: string;

    constructor(userId : string, message : string, pictureId : number, ownerId : string) {
        this.userId = userId;
        this.message = message;
        this.pictureId = pictureId;
        this.ownerId = ownerId;
    }
}
