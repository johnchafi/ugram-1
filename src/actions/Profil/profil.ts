
/*
 * We're defining every action name constant here
 * We're using Typescript's enum
 * Typescript understands enum better
 */

import axios from "axios";
import {IStateProfilApp} from "../../reducers/Profil/Profil";
import {Dispatch} from "redux";
import User from "../../models/User";
import {getPictureForProfil} from "../Picture/picture";

export enum ActionTypes {
    PROFIL = 'PROFIL',
    FEED = 'FEED',
    AUTHENTICATED = 'AUTH',
    CLOSE_EDIT_PROFIL= 'CLOSE_EDIT_PROFIL',
    ERROR = 'ERROR',
}

/*
 * Define return types of our actions
 * Every action returns a type and a payload
 */
export interface UserProfilAction { type: ActionTypes, payload: IStateProfilApp }

/*
 * Define our actions creators
 * We are returning the right Action for each function
 */


export function closeEdit(user : User) : any {
    /**@todo api*/
    return function (dispatch: Dispatch<IStateProfilApp>) {
        dispatch(  {
            type: ActionTypes.CLOSE_EDIT_PROFIL,
            payload: {
                user: JSON.parse(JSON.stringify(user))
            }
        })
    }
}

export function editUser(user: User) : any {
    /**@todo api*/
    return function (dispatch: Dispatch<IStateProfilApp>) {
        axios.put('http://api.ugram.net/users/' + user.id, {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber
        }, {
            headers: {
                Authorization: 'Bearer ' + "91935b05-358b-4f41-aa79-8d6248d63637",
            },
        }).then(function () {
            return dispatch(profilData(user.id));
        })
            .catch(function (error) {
                console.log(JSON.stringify(error));
                dispatch({
                    type: ActionTypes.ERROR,
                    payload: {
                        isAuthenticated: false,
                        pictures: null,
                        status: error.response.status,
                        message: error.response.data.message
                    }
                })
            });

    }
}

export function profilData(userid): any {
    return function(dispatch : Dispatch<IStateProfilApp>) {
        axios.get('http://api.ugram.net/users/' + userid)
            .then(function (user) {
                dispatch(  {
                    type: ActionTypes.PROFIL,
                    payload: {
                        isAuthenticated: true,
                        user: user.data,
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
export type Action = UserProfilAction
