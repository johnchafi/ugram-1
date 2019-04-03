import {IStateComment} from "../../reducers/Comment/Comment";
import {Comment} from "../../models/Comment";
import Picture from "../../models/Picture";

export enum ActionTypes {
    ADD_COMMENT = "ADD_COMMENT",
    DELETE_COMMENT = "DELETE_COMMENT",
    ADD_USER = "ADD_USER",
    UPDATE_COMMENT = "UPDATE_COMMENT"
}



export interface CommentPictureAction { type: ActionTypes, payload: IStateComment }

export function addComment(comment : Comment) : any {
}

export function updateComment(picture : Picture) : any {
}

export function deleteComment(comment : Comment, userId: string) : any {
}

/*
 * Define the Action type
 * It can be one of the types defining in our action/todos file
 * It will be useful to tell typescript about our types in our reducer
 */
export type Action = CommentPictureAction
