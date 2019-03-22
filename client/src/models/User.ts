export default interface User {
    email?: string,
    firstName?: string,
    id?: string,
    lastName?: string,
    phoneNumber?: number,
    password?: string,
    pictureUrl?: string,
    confPassword?: string,
    googleId?: string,
    registrationDate?: {
        afterNow: true,
        beforeNow: true,
        equalNow: true
    }
}
