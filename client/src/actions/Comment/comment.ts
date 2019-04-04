import {IStateComment} from "../../reducers/Picture/Comment/Comment";
import {Comment} from "../../models/Comment";
import Picture from "../../models/Picture";
import {Dispatch} from "redux";
import {sdk} from "../../sdk/ugram";
import {errorStatus} from "../Status/status";

export enum ActionTypes {
    ADD_COMMENT = "ADD_COMMENT",
    DELETE_COMMENT = "DELETE_COMMENT",
    ADD_USER = "ADD_USER",
    UPDATE_COMMENT = "UPDATE_COMMENT"
}



export interface CommentPictureAction { type: ActionTypes, payload: IStateComment }


export function getComment() : any {
    return function(dispatch : Dispatch<IStateComment>) {
        sdk.getComment().then( function (response) {
            return dispatch({
                type: ActionTypes.UPDATE_COMMENT,
                payload: {
                    comments: response.data,
                }
            });
        })
            .catch(function (error) {
                return dispatch(errorStatus(error.response.status, error.response.data.message));
            });
    }
}


export function addComment(comment : Comment) : any {
    return function(dispatch : Dispatch<IStateComment>) {
        sdk.addComment(comment).then( function (response) {
            return dispatch(getComment());
        })
            .catch(function (error) {
                return dispatch(errorStatus(error.response.status, error.response.data.message));
            });
    }
}
export function deleteComment(comment : Comment) : any {
    return function(dispatch : Dispatch<IStateComment>) {
        sdk.deleteComment(comment).then( function (response) {
            return dispatch(getComment());
        })
            .catch(function (error) {
                return dispatch(errorStatus(error.response.status, error.response.data.message));
            });
    }
}

/*
 * Define the Action type
 * It can be one of the types defining in our action/todos file
 * It will be useful to tell typescript about our types in our reducer
 */
export type Action = CommentPictureAction
