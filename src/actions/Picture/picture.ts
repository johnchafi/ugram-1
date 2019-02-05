/*
 * We're defining every action name constant here
 * We're using Typescript's enum
 * Typescript understands enum better
 */
import axios from "axios";
import {Dispatch} from "redux";
import {IStateHomeApp} from "../../reducers/Home/Home";
import {profilData} from "../Profil/profil";
import {IStateProfilApp} from "../../reducers/Profil/Profil";
import Picture from "../../models/Picture";

export enum ActionTypes {
    GET_PICTURE_HOME = 'GET_PICTURE_HOME',
    GET_PICTURE_HOME_FINISH = 'GET_PICTURE_HOME_FINISH',
    FINISH = "FINISH",
    ERROR = "ERROR",
}

export interface AuthenticatedAction { type: ActionTypes, payload: IStateHomeApp }


export function getAllPicturesSortByDate(): any {
    return function(dispatch : Dispatch<IStateHomeApp>) {
        axios.get('http://api.ugram.net/pictures/')
            .then(  function (response) {
                dispatch({
                    type: ActionTypes.GET_PICTURE_HOME,
                    payload: {
                        isAuthenticated: true,
                        finish:true,
                        pictures: response.data.items,
                    }
                });
            })
            .catch(function (error) {
                dispatch( {
                    type: ActionTypes.ERROR,
                    payload: {
                        isAuthenticated: false,
                        pictures: null,
                    }
                })
            })
    }
}

export function getUserForPicture(pictures: Picture[]): any {
    return function(dispatch : Dispatch<IStateHomeApp>) {
        pictures.map(async function (picture) {
            picture.user = await axios.get('http://api.ugram.net/users/' + picture.userId).then((user) => {
                return user.data;
            })
        });
        dispatch({
            type: ActionTypes.GET_PICTURE_HOME_FINISH,
            payload: {
                pictures: pictures,
                finish:false,
            }
        });
    }
}

export function deletePicture(userId: string, pictureId: number): any {
    return function(dispatch : Dispatch<IStateProfilApp>) {
        axios.delete('http://api.ugram.net/users/' + userId + "/pictures/" + pictureId,  {
            headers: {
                Authorization: 'Bearer ' + "b0453abc-0284-40c1-b2be-762d97088e58" //the token is a variable which holds the token
            }
        })
            .then( function (response) {
                return dispatch(profilData(userId));
            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
                dispatch( {
                    type: ActionTypes.ERROR,
                    payload: {
                        isAuthenticated: false,
                        pictures: null,
                        status:error.response.status,
                        message: error.response.data.message
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
