import Picture from "../models/Picture";
import User from "../models/User";
import {Cookies} from "react-cookie";

export default interface Props {
    cookies : Cookies
    getProfil: (userId: string) => any
    closeMessage: () => any
    getPicture: (userId : string, pageNumber : number, pictures: Picture[]) => any
    reset: () => any
    user : User
    status: number,
    pageNumber: number
    match: {params : {id: string}}
    location:{pathname:string}
    pictures: Picture[],
    totalEntries: number
    message:string
    variant:string
    open: boolean
}
