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

    constructor(payload: string) {
        let data = JSON.parse(payload);

        if (!data.userId || !data.message || !data.id || !data.pictureId) {
            throw new Error('Invalid message payload received: ' + payload);
        }

        this.userId = data.userId;
        this.id = data.id;
        this.message = data.message;
        this.pictureId = data.pictureId;
    }
}
