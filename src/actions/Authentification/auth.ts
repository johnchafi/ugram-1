
/*
 * We're defining every action name constant here
 * We're using Typescript's enum
 * Typescript understands enum better
 */
import axios from "axios";
import {IStateProfilApp} from "../../reducers/Profil/Profil";
import {Dispatch} from "redux";

export enum ActionTypes {
    AUTHENTICATED = 'AUTH',
    ERROR = "ERROR",
}

/*
 * Define return types of our actions
 * Every action returns a type and a payload
 */
export interface AuthenticatedAction { type: ActionTypes.AUTHENTICATED, payload: IStateProfilApp }

/*
 * Define our actions creators
 * We are returning the right Action for each function
 */
export function authUser(): any {
    /**@todo api*/
    return function(dispatch : Dispatch<IStateProfilApp>) {
        axios.get('http://api.ugram.net/users/wfortin')
            .then(function (response) {
                // response.data;
                dispatch(  {
                    type: ActionTypes.AUTHENTICATED,
                    payload: {
                        isAuthenticated: true,
                        user: response.data,
                        status: response.status
                    }
                })
            })
            .catch(function (error) {
                dispatch( {
                    type: ActionTypes.ERROR,
                    payload: {
                        isAuthenticated: false,
                        user: null,
                        message: error
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
