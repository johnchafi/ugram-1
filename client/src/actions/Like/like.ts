import {Dispatch} from "redux";
import {sdk} from "../../sdk/ugram";
import {errorStatus} from "../Status/status";
import {Like} from "../../models/Like";
import {IStateLike} from "../../reducers/Picture/Like/Like";
import {Comment} from "../../models/Comment";

export enum ActionTypes {
    UPDATE_LIKE = "UPDATE_LIKE",
    ADD_LIKE = "ADD_LIKE",
    ADD_LIKE_IN_DB = "ADD_LIKE_IN_DB",
    DELETE_LIKE = "DELETE_LIKE"
}

export interface LikePictureAction { type: ActionTypes, payload: IStateLike }

export function getLike() : any {
    return function(dispatch : Dispatch<IStateLike>) {
        sdk.getLike().then( function (response) {
            return dispatch({
                type: ActionTypes.UPDATE_LIKE,
                payload: {
                    likes: response.data,
                }
            });
        })
            .catch(function (error) {
                return dispatch(errorStatus(error.response.status, error.response.data.message));
            });
    }
}

export function getLikeByPictureIds(like: Like[], pictureId: number[]) : any {
    return function(dispatch : Dispatch<IStateLike>) {
        let likes : Like[] = [];
        let i = 0;
        like.map(function (like : Like) {
            if (like.pictureId <= pictureId[i]) {
                pictureId[0] = like.pictureId;
            }
            i++;
        });
        sdk.getLike(pictureId[pictureId.length - 1], pictureId[0]).then( function (response) {
            like.map(function (comment : Comment) {likes.push(Object.assign({}, comment))}.bind(likes));
            response.data.items.filter(function (like : Like) {
                let equals = false;
                likes.map(function (oldLike : Like) {
                    if (oldLike.id === like.id) {
                        equals = true;
                    }
                }.bind(equals));
                if (!equals) {
                    likes.push(Object.assign({}, like));
                }
            }.bind(likes));
            return dispatch({
                type: ActionTypes.UPDATE_LIKE,
                payload: {
                    likes: likes,
                }
            });
        }.bind(likes));
    }
}

export function deleteLikebyId(id : number) : any {
    return function(dispatch : Dispatch<IStateLike>) {
        return dispatch({
            type: ActionTypes.DELETE_LIKE,
            payload: {
                id: id,
            }
        });
    }
}

export function getLikeById(id : number) : any {
    return function(dispatch : Dispatch<IStateLike>) {
        sdk.getLikeById(id).then( function (response) {
            return dispatch({
                type: ActionTypes.ADD_LIKE,
                payload: {
                    like: response.data,
                }
            });
        }).catch(function (error) {
            return dispatch(errorStatus(error.response.status, error.response.data.message));
        });
    }
}

export function addLike(like : Like) : any {
    return function(dispatch : Dispatch<IStateLike>) {
        sdk.addLike(like).then( function (response) {
            return dispatch({
                type: ActionTypes.ADD_LIKE_IN_DB,
            });
        })
            .catch(function (error) {
                return dispatch(errorStatus(error.response.status, error.response.data.message));
            });
    }
}

export function deleteLike(like : Like) : any {
    return function(dispatch : Dispatch<IStateLike>) {
        sdk.deleteLike(like).then( function (response) {
            return dispatch(deleteLikebyId(like.id));
        })
            .catch(function (error) {
                return dispatch(errorStatus(error.response.status, error.response.data.message));
            });
    }
}

export type Action = LikePictureAction
