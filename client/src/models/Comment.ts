export interface Comment {
    message: string;
    userId: string;
    id: number,
    pictureId: number
}

export class CommentUser implements Comment {
    message: string;
    userId: string;
    id: number;
    pictureId: number;

    constructor(userId : string, message : string, pictureId : number) {
        this.userId = userId;
        this.message = message;
        this.pictureId = pictureId;
    }
}
