import Picture from "../models/Picture";
import User from "../models/User";

export default interface Props {
    pictures: Picture[],
    user: User,
    isHome:boolean,
    isMe:boolean,
    getComment : () => any
    getLike : () => any
    getNotifications : (userId : string) => any
    me : string
}
