import {IStateProfilApp} from "../../reducers/Profil/Profil";
import {Dispatch} from "redux";
import { sdk } from "../../sdk/ugram";
import {IStateAuthApp} from "../../reducers/Authentifcation/auth";
import User from "../../models/User";
import {errorStatus, successStatus} from "../Status/status";
import {UserProfilAction} from "../Profil/profil";
import io from "socket.io-client";

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
                dispatch(errorStatus(error.response.status, error.response.data.message));
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
        sdk.createUser(user)
            .then(function (response) {
                dispatch(successStatus(response.status, "Profil créé avec succès"));
            })
            .catch(function (error) {
                dispatch(errorStatus(error.response.status, error.response.data.message));
            });
    }
}

export function authUserGoogle(googleObject: any): any {
    return function(dispatch : Dispatch<IStateProfilApp>) {
        let user : User = {};
        user.id =  googleObject.profileObj.givenName + googleObject.profileObj.familyName + googleObject.profileObj.googleId.slice(0, 4);
        user.phoneNumber = googleObject.profileObj.googleId;
        user.email = googleObject.profileObj.email;
        user.firstName = googleObject.profileObj.givenName;
        user.password = googleObject.profileObj.googleId;
        user.lastName = googleObject.profileObj.familyName;
        user.pictureUrl = googleObject.profileObj.imageUrl;
        user.googleId = googleObject.profileObj.googleId;
        sdk.loginGoogle(user, googleObject.tokenId).then(function (response) {
            sdk.setToken(response.data.token);
            let socket = io.connect('http://localhost:3000');
            socket.on('GET_COMMENTS', function (data) {
                console.log(data);
            });
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

export function disconnectUser() : any {
    return function (dispatch: Dispatch<UserProfilAction>) {
            return dispatch(  {
                type: ActionTypes.LOGOUT,
                payload: {
                    isAuthenticated: false,
                    user: null,
                    token:null
                }
            })

    }
}

export function authUser(username: string, password:string): any {
    return function(dispatch : Dispatch<IStateProfilApp>) {
        sdk.login(username, password)
            .then(function (response) {
                sdk.setToken(response.data.token);
                let socket = io.connect('http://localhost:3000');
                socket.on('GET_COMMENTS', function (data) {
                    console.log(data);
                });
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
                        token: null
                    }
                })
            });
    }
}

export type Action = AuthenticatedAction
