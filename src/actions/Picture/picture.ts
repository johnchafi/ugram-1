/*
 * We're defining every action name constant here
 * We're using Typescript's enum
 * Typescript understands enum better
 */
import axios from "axios";
import {Dispatch} from "redux";
import {IStatePictureApp} from "../../reducers/Picture/Picture";
import {profilData} from "../Profil/profil";
import {IStateProfilApp} from "../../reducers/Profil/Profil";
import Picture from "../../models/Picture";

export enum ActionTypes {
    GET_PICTURE_HOME = 'GET_PICTURE_HOME',
    GET_PICTURE_HOME_FINISH = 'GET_PICTURE_HOME_FINISH',
    GET_PICTURE_PROFIL = 'GET_PICTURE_PROFIL',
    ERROR = "ERROR"
}

export interface AuthenticatedAction { type: ActionTypes, payload: IStatePictureApp }



export function getPictureForProfil(userid: string) : any {
    return function(dispatch : Dispatch<IStatePictureApp>) {
        axios.get('http://api.ugram.net/users/' + userid + '/pictures')
            .then(function (response) {
                dispatch({
                    type: ActionTypes.GET_PICTURE_PROFIL,
                    payload: {
                        pictures: response.data.items,
                    }
                })
            })
    }
}

export function getAllPicturesSortByDate(): any {
    return function(dispatch : Dispatch<IStatePictureApp>) {
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
    return async function (dispatch: Dispatch<IStatePictureApp>) {
        let results: Picture[] = [];
        for (let i = 0; i < pictures.length ; i++)
        {
            results.push(Object.assign({}, {
                user: await axios.get('http://api.ugram.net/users/' + pictures[i].userId).then((user) => {
                    return user.data;
                })
            }, pictures[i]));
        }
        dispatch({
            type: ActionTypes.GET_PICTURE_HOME_FINISH,
            payload: {
                pictures: results,
                finish: false,
            }
        });
    }
}

export function editPicture(picture:Picture): any {
    console.log(picture);
    return function(dispatch : Dispatch<IStateProfilApp>) {
        axios.put('http://api.ugram.net/users/' + picture.userId + "/pictures/" + picture.id,  {
            description: picture.description,
            tags: picture.tags,
            mentions:picture.mentions
        },{
            headers: {
                Authorization: 'Bearer ' + "91935b05-358b-4f41-aa79-8d6248d63637", //the token is a variable which holds the token
            },
        }).then( function (response) {
            return dispatch(getPictureForProfil(picture.userId));
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

export function deletePicture(userId: string, pictureId: number): any {
    return function(dispatch : Dispatch<IStateProfilApp>) {
        axios.delete('http://api.ugram.net/users/' + userId + "/pictures/" + pictureId,  {
            headers: {
                Authorization: 'Bearer ' + "91935b05-358b-4f41-aa79-8d6248d63637" //the token is a variable which holds the token
            }
        })
            .then( function (response) {
                return dispatch(getPictureForProfil(userId));
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
