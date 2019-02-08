import axios from "axios";
import {IStateProfilApp} from "../../reducers/Profil/Profil";
import {Dispatch} from "redux";

export enum ActionTypes {
    AUTHENTICATED = 'AUTH',
    ERROR = "ERROR",
}

export interface AuthenticatedAction { type: ActionTypes.AUTHENTICATED, payload: IStateProfilApp }

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
export type Action = AuthenticatedAction
