import {IStateProfilApp} from "../../reducers/Profil/Profil";
import {Dispatch} from "redux";
import { sdk } from "../../sdk/ugram";
import {IStateAuthApp} from "../../reducers/Authentifcation/auth";
import User from "../../models/User";
import {errorStatus, successStatus} from "../Status/status";

export enum ActionTypes {
    AUTHENTICATED = "AUTH",
    TOKEN = "TOKEN",
    ERROR = "ERROR-AUTH",
    LOGOUT = "LOGOUT"
}

export interface AuthenticatedAction { type: ActionTypes, payload: IStateAuthApp }


export function getUserWithToken(token: string): any {
    return function(dispatch : Dispatch<IStateProfilApp>) {
        if (!token) {
            sdk.setToken("");
            return dispatch({
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
                dispatch(errorStatus(error.response.status, error.response.data.message));
            });
    }
}


export function authUserGoogle(googleObject: any): any {
    return function(dispatch : Dispatch<IStateProfilApp>) {


        let user : User = {};
        console.log(googleObject.tokenObj.access_token);
        console.log(googleObject.profileObj);
        console.log(googleObject.tokenId);
        user.id = googleObject.profileObj.googleId;
        user.phoneNumber = googleObject.profileObj.googleId;
        user.email = googleObject.profileObj.email;
        user.firstName = googleObject.profileObj.givenName;
        user.password = googleObject.profileObj.googleId;
        user.lastName = googleObject.profileObj.familyName;
        user.pictureUrl = googleObject.profileObj.imageUrl;
        sdk.loginGoogle(user, googleObject.tokenId).then(function (response) {
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
                dispatch(errorStatus(error.response.status, error.response.data.message));
                dispatch( {
                    type: ActionTypes.ERROR,
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    }
                })
            })
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
                console.log(error.response);
                dispatch(errorStatus(error.response.status, error.response.data.message));
                dispatch( {
                    type: ActionTypes.ERROR,
                    payload: {
                        isAuthenticated: false,
                        user: null,
                        token: null
                    }
                })
            });
    }
}
export type Action = AuthenticatedAction
