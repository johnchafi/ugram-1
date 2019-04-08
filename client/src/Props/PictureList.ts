import Picture from "../models/Picture";
import User from "../models/User";
import {Comment} from "../models/Comment";
import {Like} from "../models/Like";

export default interface Props {
    pictures: Picture[],
    user: User,
    isHome:boolean,
    isMe:boolean,
    getComment : () => any
    getCommentByPictureIds : (comment : Comment[], pictureIds : number[]) => any
    getLikesByPictureIds : (like : Like[], pictureIds : number[]) => any
    getLike : () => any
    comments : Comment[]
    likes : Like[]
    getNotifications : (userId : string) => any
    me : string
}
