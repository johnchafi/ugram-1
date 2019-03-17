import {IStateProfilApp} from "../../reducers/Profil/Profil";
import {Dispatch} from "redux";
import { sdk } from "../../sdk/ugram";
import {IStateAuthApp} from "../../reducers/Authentifcation/auth";
import User from "../../models/User";
import {errorStatus, successStatus} from "../Status/status";

export enum ActionTypes {
    AUTHENTICATED = "AUTH",
    TOKEN = "TOKEN",
    ERROR = "ERROR-AUTH"
}

export interface AuthenticatedAction { type: ActionTypes, payload: IStateAuthApp }


export function getUserWithToken(token: string): any {
    return function(dispatch : Dispatch<IStateProfilApp>) {
        if (!token) {
            sdk.setToken("");
            dispatch({
                type: ActionTypes.ERROR,
                payload: {
                    isAuthenticated: false,
                    user: null,

                }
            });
        }
        sdk.getUserByToken(token)
            .then(function (response) {
                sdk.setToken(response.data.token);
                dispatch(  {
                    type: ActionTypes.AUTHENTICATED,
                    payload: {
                        isAuthenticated: true,
                        user: response.data.userId,
                        token: response.data.token
                    }
                })
            })
            .catch(function (error) {
            });
    }
}


export function checkTokenValidity(token: string): any {
    return function(dispatch : Dispatch<IStateProfilApp>) {
        sdk.getUserByToken(token)
            .then(function (response) {
                sdk.setToken(response.data.token);
                dispatch(  {
                    type: ActionTypes.TOKEN,
                    payload: {
                        isAuthenticated: true,
                    }
                })
            })
            .catch(function (error) {
            });
    }
}

export function createUser(user: User): any {
    return function(dispatch : Dispatch<IStateProfilApp>) {
        console.log(user);
        sdk.createUser(user)
            .then(function (response) {
                dispatch(successStatus(response.status, "Profil créer avec succès"));
            })
            .catch(function (error) {
                dispatch(errorStatus(error.response.status, error.response.data));
            });
    }
}


export function authUser(username: string, password:string): any {
    return function(dispatch : Dispatch<IStateProfilApp>) {
        sdk.login(username, password)
            .then(function (response) {
                console.log(response);
                sdk.setToken(response.data.token);
                dispatch(  {
                    type: ActionTypes.AUTHENTICATED,
                    payload: {
                        isAuthenticated: true,
                        user: response.data.userId,
                        token: response.data.token
                    }
                })
            })
            .catch(function (error) {
                dispatch(errorStatus(error.response.status, error.response.data));
                dispatch( {
                    type: ActionTypes.ERROR,
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    }
                })
            });
    }
}
export type Action = AuthenticatedAction
