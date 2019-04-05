import {IStateProfilApp} from "../../reducers/Profil/Profil";
import {Dispatch} from "redux";
import { sdk } from "../../sdk/ugram";
import {IStateAuthApp} from "../../reducers/Authentifcation/auth";
import User from "../../models/User";
import {errorStatus, successStatus} from "../Status/status";
import {UserProfilAction} from "../Profil/profil";
import * as io from "socket.io-client";
import {deleteCommentbyId, getComment, getCommentById} from "../Comment/comment";
import {deleteLikebyId, getLike, getLikeById} from "../Like/like";
import {getNotifications} from "../Notifications/notifications";
let socket : SocketIOClient.Socket = null;
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
                if (socket == null) {
                    initSocket(dispatch, response.data.userId);
                }
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

function initSocket(dispatch, userId : string) {
    socket = io.connect("http://localhost:3000");
    socket.on("GET_COMMENTS", function (data) {
        if (data.delete) {
            return dispatch(deleteCommentbyId(data.data));
        }
        return dispatch(getCommentById(data.data));
    });
    socket.on("GET_LIKES", function (data) {
        if (data.delete) {
            return dispatch(deleteLikebyId(data.data));
        }
        return dispatch(getLikeById(data.data));
    });
    socket.on(userId, function () {
        return dispatch(getNotifications(userId));
    });
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
            initSocket(dispatch, user.id);
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
                initSocket(dispatch, response.data.userId);
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
