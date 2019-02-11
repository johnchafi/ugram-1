import Picture from "../models/Picture";

export default interface Props {
    getPicturesByDate: (number, picture : Picture[]) => any
    overGetPics:(picture: Picture[]) => any,
    reset:() => any,
    pictures: Picture[],
    pageNumber: number
    finish:boolean
}
