export default interface User {
    email?: string;
    firstName?: string;
    id?: string;
    lastName?: string;
    phoneNumber?: number;
    pictureUrl?: string;
    registrationDate?: {
        afterNow: true;
        beforeNow: true;
        equalNow: true;
    };
}
