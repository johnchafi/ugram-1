export class User {
    constructor(response) {
        this.id = response.id;
        this.email = response.email;
        this.firstName = response.firstName;
        this.lastName = response.lastName;
        this.phoneNumber = response.phoneNumber;
        this.pictureUrl = response.pictureUrl;
        this.registrationDate = new Date(this.registrationDate);
    }
}