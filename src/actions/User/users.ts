
/*
 * We're defining every action name constant here
 * We're using Typescript's enum
 * Typescript understands enum better
 */
import axios from "axios";
import {IStateUsersApp} from "../../reducers/Users/UserList";
import {Dispatch} from "redux";

export enum ActionTypes {
    GET_USERS = 'GET_USERS',
    ERROR = "ERROR",
}
/*
 * Define return types of our actions
 * Every action returns a type and a payload
 */
export interface AuthenticatedAction { type: ActionTypes, payload: IStateUsersApp }

/*
 * Define our actions creators
 * We are returning the right Action for each function
 */
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

/*
 * Define the Action type
 * It can be one of the types defining in our action/todos file
 * It will be useful to tell typescript about our types in our reducer
 */
export type Action = AuthenticatedAction
