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
    UPDATE_COMMENT = "UPDATE_COMMENT",
    ADD_COMMENT_IN_DB = "ADD_COMMENT_IN_DB"
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

export function getCommentByPictureIds(comment: Comment[], pictureId: number[]) : any {
    return function(dispatch : Dispatch<IStateComment>) {
        let comments : Comment[] = [];
        let i = 0;
        comment.map(function (comment : Comment) {
            if (comment.pictureId <= pictureId[i]) {
                pictureId[0] = comment.pictureId;
            }
            i++;
        });
        sdk.getComment(pictureId[pictureId.length - 1], pictureId[0]).then( function (response) {
            comment.map(function (comment : Comment) {comments.push(Object.assign({}, comment))}.bind(comments));
            response.data.items.filter(function (comment : Comment) {
                let equals = false;
                comments.map(function (oldComment : Comment) {
                    if (oldComment.id === comment.id) {
                        equals = true;
                    }
                }.bind(equals));
                if (!equals) {
                    comments.push(Object.assign({}, comment));
                }
            }.bind(comments));
            return dispatch({
                type: ActionTypes.UPDATE_COMMENT,
                payload: {
                    comments: comments,
                }
            });
        }.bind(comments));
    }
}

export function getCommentById(id : number) : any {
    return function(dispatch : Dispatch<IStateComment>) {
        sdk.getCommentById(id).then( function (response) {
            return dispatch({
                type: ActionTypes.ADD_COMMENT,
                payload: {
                    comment: response.data,
                }
            });
        }).catch(function (error) {
            return dispatch(errorStatus(error.response.status, error.response.data.message));
        });
    }
}

export function deleteCommentbyId(id : number) : any {
    return function(dispatch : Dispatch<IStateComment>) {
        return dispatch({
            type: ActionTypes.DELETE_COMMENT,
            payload: {
                id: id,
            }
        });
    }
}

export function addComment(comment : Comment) : any {
    return function(dispatch : Dispatch<IStateComment>) {
        sdk.addComment(comment).then( function (response) {
            return dispatch({
                type: ActionTypes.ADD_COMMENT_IN_DB,
            });
        })
            .catch(function (error) {
                return dispatch(errorStatus(error.response.status, error.response.data.message));
            });
    }
}
export function deleteComment(comment : Comment) : any {
    return function(dispatch : Dispatch<IStateComment>) {
        sdk.deleteComment(comment).then( function (response) {
            return dispatch(deleteCommentbyId(comment.id));
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
