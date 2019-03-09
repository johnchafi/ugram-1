export class Date {
    constructor(response) {
        this.afterNow = response.afterNow,
        this.beforeNow = response.beforeNow,
        this.equalNow = response.equalNow
    }
}