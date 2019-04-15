import {IStateUsersApp} from "../../reducers/Explore/Explore";
import {Dispatch} from "redux";
import { sdk } from "../../sdk/ugram";

export enum ActionTypes {
    GET_PICTURES = "GET_PICTURES",
    ERROR = "ERROR",
}
export interface AuthenticatedAction { type: ActionTypes, payload: IStateUsersApp }

export function getAllPicturesByTag(): any {
    return function(dispatch : Dispatch<IStateUsersApp>) {

        dispatch( {
            type: ActionTypes.ERROR,
            payload: {
                users: null,
            }
        })
    }
}
export type Action = AuthenticatedAction
