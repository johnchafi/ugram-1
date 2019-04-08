export interface Like {
    userId: string;
    id: number,
    pictureId: number
    ownerId: string
}

export class LikeUser implements Like {
    userId: string;
    id: number;
    pictureId: number;
    ownerId : string;

    constructor(userId : string, pictureId : number, ownerId : string) {
        this.userId = userId;
        this.pictureId = pictureId;
        this.ownerId = ownerId;
    }
}
