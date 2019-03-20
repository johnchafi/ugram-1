import {IStateProfilApp} from "../../reducers/Profil/Profil";
import {Dispatch} from "redux";
import User from "../../models/User";
import { sdk } from "../../sdk/ugram";
import {errorStatus, successStatus} from "../Status/status";

export enum ActionTypes {
    PROFIL = "PROFIL",
    ERROR = "ERROR_USER",
    LOGOUT = "LOGOUT",
}

export interface UserProfilAction { type: ActionTypes, payload: IStateProfilApp }

export function deleteUser(userId: string) : any {
    return function (dispatch: Dispatch<UserProfilAction>) {
        sdk.deleteUser(userId).then(function (response) {
           return dispatch(  {
                type: ActionTypes.LOGOUT,
                payload: {
                    isAuthenticated: false,
                }
            })
        })
            .catch(function (error) {
                return (dispatch(errorStatus(error.response.status, error.response.data.message)));
            });

    }
}

export function editUser(user: User) : any {
    return function (dispatch: Dispatch<UserProfilAction>) {
        sdk.editUser(user.id, {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber
        }).then(function (response) {
            dispatch(successStatus(response.status, "Profil modifié avec succès"));
            return dispatch(profilData(user.id));
        })
            .catch(function (error) {
                dispatch(profilData(user.id));
                return (dispatch(errorStatus(error.response.status, error.response.data.message)));
            });

    }
}

export function profilData(userid): any {
    return function(dispatch : Dispatch<UserProfilAction>) {
        return sdk.getUser(userid)
            .then(function (user) {
                dispatch(  {
                    type: ActionTypes.PROFIL,
                    payload: {
                        user: user.data,
                    }
                })
            })
            .catch(function (error) {
                dispatch( {
                    type: ActionTypes.ERROR,
                    payload: {
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
export type Action = UserProfilAction
