import {IStateProfilApp} from "../../reducers/Profil/Profil";
import {Dispatch} from "redux";
import { sdk } from "../../sdk/ugram";

export enum ActionTypes {
    AUTHENTICATED = 'AUTH',
    ERROR = "ERROR",
}

export interface AuthenticatedAction { type: ActionTypes.AUTHENTICATED, payload: IStateProfilApp }

export function authUser(username: string, password:string): any {
    return function(dispatch : Dispatch<IStateProfilApp>) {
        sdk.getUser('wfortin')
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
