import {IStateProfilApp} from "../../reducers/Profil/Profil";
import {Dispatch} from "redux";
import User from "../../models/User";
import { sdk } from "../../sdk/ugram";

export enum ActionTypes {
    PROFIL = 'PROFIL',
    CLOSE_EDIT_PROFIL= 'CLOSE_EDIT_PROFIL',
    ERROR = 'ERROR',
}

export interface UserProfilAction { type: ActionTypes, payload: IStateProfilApp }

/*
 * Define our actions creators
 * We are returning the right Action for each function
 */

export function closeEdit(user : User) : any {
    return function (dispatch: Dispatch<UserProfilAction>) {
        dispatch(  {
            type: ActionTypes.CLOSE_EDIT_PROFIL,
            payload: {
                user: JSON.parse(JSON.stringify(user))
            }
        })
    }
}

export function editUser(user: User) : any {
    return function (dispatch: Dispatch<UserProfilAction>) {
        sdk.editUser(user.id, {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber
        }).then(function () {
            return dispatch(profilData(user.id));
        })
            .catch(function (error) {
                console.log(JSON.stringify(error));
                dispatch({
                    type: ActionTypes.ERROR,
                    payload: {
                        pictures: null,
                        status: error.response.status,
                        message: error.response.data.message
                    }
                })
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
