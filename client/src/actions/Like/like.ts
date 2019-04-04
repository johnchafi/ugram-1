
import {Dispatch} from "redux";
import {sdk} from "../../sdk/ugram";
import {errorStatus} from "../Status/status";
import {Like} from "../../models/Like";
import {IStateLike} from "../../reducers/Picture/Like/Like";

export enum ActionTypes {
    UPDATE_LIKE = "UPDATE_LIKE"
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


export function addLike(like : Like) : any {
    return function(dispatch : Dispatch<IStateLike>) {
        sdk.addLike(like).then( function (response) {
            return dispatch(getLike());
        })
            .catch(function (error) {
                return dispatch(errorStatus(error.response.status, error.response.data.message));
            });
    }
}
export function deleteLike(like : Like) : any {
    return function(dispatch : Dispatch<IStateLike>) {
        sdk.deleteLike(like).then( function (response) {
            return dispatch(getLike());
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
export type Action = LikePictureAction
