import axios from 'axios';
import {Dispatch} from "redux";
import {IStatePictureApp} from "../../reducers/Picture/Picture";
import {IStateProfilApp} from "../../reducers/Profil/Profil";
import Picture from "../../models/Picture";
import User from "../../models/User";

let CancelToken = axios.CancelToken;
let call1 = CancelToken.source();
let call2 = CancelToken.source();
let picturesOfUser = CancelToken.source();

export enum ActionTypes {
    GET_PICTURE_HOME = 'GET_PICTURE_HOME',
    GET_PICTURE_HOME_FINISH = 'GET_PICTURE_HOME_FINISH',
    GET_PICTURE_PROFIL = 'GET_PICTURE_PROFIL',
    RESET = 'RESET',
    ERROR = "ERROR"
}
export interface AuthenticatedAction { type: ActionTypes, payload: IStatePictureApp }

export function getPictureForProfil(userid: string, pageNumber: number, pictures: Picture[]) : any {
    /**@todo api*/
    return function(dispatch : Dispatch<IStatePictureApp>) {
        let results: Picture[] = [];
        axios.get('http://api.ugram.net/users/' + userid + '/pictures?page=' + pageNumber, {cancelToken:picturesOfUser.token})
            .then(function (response) {
                pictures.map(function (picture : Picture) {results.push(Object.assign({}, picture))}.bind(results));
                response.data.items.map(function (picture : Picture) {results.push(Object.assign({}, picture))}.bind(results));
                if (response.data.totalPages > pageNumber)
                    pageNumber = pageNumber + 1;
                dispatch({
                    type: ActionTypes.GET_PICTURE_PROFIL,
                    payload: {
                        pictures: results,
                        pageNumber: pageNumber
                    }
                })
            })
    }
}

export function getAllPicturesSortByDate(pageNumber: number, pictures: Picture[]): any {
    /**@todo api*/
    return function(dispatch : Dispatch<IStatePictureApp>) {
        let results: Picture[] = [];
        return axios.get('http://api.ugram.net/pictures/?page=' + pageNumber, {cancelToken:call1.token})
            .then(  function (response) {
                pictures.map(function (picture : Picture) {results.push(Object.assign({}, picture))}.bind(results));
                response.data.items.map(function (picture : Picture) {results.push(Object.assign({}, picture))}.bind(results));
                if (response.data.totalPages > pageNumber)
                    pageNumber = pageNumber + 1;
                dispatch({
                    type: ActionTypes.GET_PICTURE_HOME,
                    payload: {
                        isAuthenticated: true,
                        finish: true,
                        pictures: results,
                        pageNumber: pageNumber
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
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

export function resetProfil(): any {
    /**@todo api*/
    picturesOfUser.cancel();
    picturesOfUser = CancelToken.source();
    return function (dispatch: Dispatch<IStatePictureApp>) {
        dispatch({
            type: ActionTypes.RESET,
        });
    }
}

export function reset(): any {
    /**@todo api*/
    call1.cancel();
    call2.cancel();
    call1 = CancelToken.source();
    call2 = CancelToken.source();
    return function (dispatch: Dispatch<IStatePictureApp>) {
        dispatch({
            type: ActionTypes.RESET
        });
    }
}

export function getUserForPicture(pictures: Picture[]): any {
    /**@todo api*/
    return async function (dispatch: Dispatch<IStatePictureApp>) {
        let results: Picture[] = [];
        let stop : boolean = false;
        let users : User[] = [];
        users = await axios.get('http://api.ugram.net/users/').then(function (response) {
            return response.data.items;
        }).catch(error => {
            if (axios.isCancel(error))
                stop = true;
        });
        console.log(users);
        pictures.map(function (picture : Picture) {
            for (let i = 0; i < users.length && !stop; i++) {
                if (!picture.user && users[i].id == picture.userId) {
                    results.push(Object.assign({}, {user: users[i]}, picture));
                    return ;
                }
                else if (picture.user) {
                    results.push(Object.assign({}, picture));
                    return ;
                }
            }
        }.bind(results));
        if (!stop)
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
    /**@todo api*/
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
            return dispatch(getPictureForProfil(picture.userId, 0, []));
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
    /**@todo api*/
    return function(dispatch : Dispatch<IStateProfilApp>) {
        axios.delete('http://api.ugram.net/users/' + userId + "/pictures/" + pictureId,  {
            headers: {
                Authorization: 'Bearer ' + "91935b05-358b-4f41-aa79-8d6248d63637" //the token is a variable which holds the token
            }
        })
            .then( function (response) {
                return dispatch(getPictureForProfil(userId, 0, []));
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
export type Action = AuthenticatedAction
