
import axios from "axios";
import {IStateUsersApp} from "../../reducers/Users/UserList";
import {Dispatch} from "redux";

export enum ActionTypes {
    GET_USERS = 'GET_USERS',
    ERROR = "ERROR",
}
export interface AuthenticatedAction { type: ActionTypes, payload: IStateUsersApp }

export function getAllUsers(): any {
    /**@todo api*/
    return function(dispatch : Dispatch<IStateUsersApp>) {
        axios.get('http://api.ugram.net/users/')
            .then(function (response) {
                // response.data;
                dispatch(  {
                    type: ActionTypes.GET_USERS,
                    payload: {
                        isAuthenticated: true,
                        users: response.data.items,
                    }
                })
            })
            .catch(function (error) {
                dispatch( {
                    type: ActionTypes.ERROR,
                    payload: {
                        isAuthenticated: false,
                        users: null,
                    }
                })
            });
    }
}
export type Action = AuthenticatedAction
