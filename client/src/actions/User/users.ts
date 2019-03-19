import {IStateUsersApp} from "../../reducers/Users/UserList";
import {Dispatch} from "redux";
import { sdk } from "../../sdk/ugram";

export enum ActionTypes {
    GET_USERS = "GET_USERS",
    ERROR = "ERROR",
}
export interface AuthenticatedAction { type: ActionTypes, payload: IStateUsersApp }

export function getAllUsers(): any {
    return function(dispatch : Dispatch<IStateUsersApp>) {
        sdk.getUsers()
            .then(function (response) {
                // response.data;
                dispatch(  {
                    type: ActionTypes.GET_USERS,
                    payload: {
                        users: response.data.items,
                    }
                })
            })
            .catch(function (error) {
                dispatch( {
                    type: ActionTypes.ERROR,
                    payload: {
                        users: null,
                    }
                })
            });
    }
}
export type Action = AuthenticatedAction
