export class Picture {
    constructor(response) {
        this.id = response.id;
        this.userId = response.userId;
        this.url = response.url;
        this.description = response.description;
        this.mentions = response.mentions;
        this.tags = response.tags;
        this.createdDate = new Date(this.createdDate);
    }
}