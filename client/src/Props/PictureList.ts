import Picture from "../models/Picture";
import User from "../models/User";

export default interface Props {
    pictures: Picture[],
    user: User
    isHome:boolean
}
