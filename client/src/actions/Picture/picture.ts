import axios from "axios";
import {Dispatch} from "redux";
import {IStatePictureApp} from "../../reducers/Picture/Picture";
import {IStateProfilApp} from "../../reducers/Profil/Profil";
import Picture from "../../models/Picture";
import UploadModel from "../../models/Upload";
import User from "../../models/User";
import { sdk } from '../../sdk/ugram';
import {errorStatus, successStatus} from "../Status/status";

export enum ActionTypes {
    GET_PICTURE_HOME = 'GET_PICTURE_HOME',
    GET_PICTURE_HOME_FINISH = 'GET_PICTURE_HOME_FINISH',
    GET_PICTURE_PROFIL = 'GET_PICTURE_PROFIL',
    UPLOAD_PICTURE_PROFIL_SUCCESS = 'UPLOAD_PICTURE_PROFIL_SUCCESS',
    RESET = 'RESET',
    ERROR = "ERROR",
    EDIT_PICTURE = 'EDIT_PICTURE'
}
export interface AuthenticatedAction { type: ActionTypes, payload: IStatePictureApp }

export function getPictureForProfil(userid: string, pageNumber: number, pictures: Picture[]) : any {
    return function(dispatch : Dispatch<IStatePictureApp>) {
        let results: Picture[] = [];
        return sdk.getPicturesByUser(userid, pageNumber)
            .then(function (response) {
                pictures.map(function (picture : Picture) {results.push(Object.assign({}, picture))}.bind(results));
                response.data.items.map(function (picture : Picture) {results.push(Object.assign({}, picture))}.bind(results));
                if (response.data.totalPages > pageNumber)
                    pageNumber = pageNumber + 1;
                dispatch({
                    type: ActionTypes.GET_PICTURE_PROFIL,
                    payload: {
                        pictures: results,
                        pageNumber: pageNumber,
                        totalEntries: response.data.totalEntries
                    }
                })
            })
    }
}

export function getAllPicturesSortByDate(pageNumber: number, pictures: Picture[]): any {
    return function(dispatch : Dispatch<IStatePictureApp>) {
        let results: Picture[] = [];
        return sdk.getPictures(pageNumber)
            .then(  function (response) {
                console.log(response);
                pictures.map(function (picture : Picture) {results.push(Object.assign({}, picture))}.bind(results));
                response.data.items.map(function (picture : Picture) {results.push(Object.assign({}, picture))}.bind(results));
                if (response.data.totalPages > pageNumber)
                    pageNumber = pageNumber + 1;
                dispatch({
                    type: ActionTypes.GET_PICTURE_HOME,
                    payload: {
                        finish: true,
                        pictures: results,
                        pageNumber: pageNumber
                    }
                });
            })
            .catch(function (error) {
                dispatch( {
                    type: ActionTypes.ERROR,
                    payload: {
                        pictures: null,
                    }
                })
            })
    }
}

export function uploadPicture(userId : string, file : File, model : UploadModel): any {
    return function (dispatch: Dispatch<IStatePictureApp>) {
        sdk.uploadPictureByUser(userId, file, model).then(response => {
            dispatch(successStatus(response.status, "Image ajoutée avec succès"));
            return dispatch(getPictureForProfil(userId, 0, []));
        }).catch(error => {
            return (dispatch(errorStatus(error.response.status, error.response.data.message)));
        });
    }
}

export function resetProfil(): any {
    sdk.cancelToken();
    return function (dispatch: Dispatch<IStatePictureApp>) {
        dispatch({
            type: ActionTypes.RESET,
        });
    }
}

export function reset(): any {
    sdk.resetToken();
    return function (dispatch: Dispatch<IStatePictureApp>) {
        dispatch({
            type: ActionTypes.RESET
        });
    }
}

export function getUserForPicture(pictures: Picture[]): any {
    return async function (dispatch: Dispatch<IStatePictureApp>) {
        let results: Picture[] = [];
        let stop : boolean = false;
        let users : User[] = [];
        users = await sdk.getUsers().then(function (response) {
            return response.data.items;
        }).catch(error => {
            if (axios.isCancel(error))
                stop = true;
        });
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
    return function(dispatch : Dispatch<IStateProfilApp>) {
        sdk.updatePictureByUser(picture.userId, picture.id, {
            description: picture.description,
            tags: picture.tags,
            mentions:picture.mentions
        }).then( function (response) {
            dispatch(successStatus(response.status, "Image éditée avec succès"));
            return dispatch(getPictureForProfil(picture.userId, 0, []));
        })
            .catch(function (error) {
                return dispatch(errorStatus(error.response.status, error.response.data.message));
            });
    }
}

export function deletePicture(userId: string, pictureId: number): any {
    return function(dispatch : Dispatch<IStateProfilApp>) {
        sdk.deletePictureByUser(userId, pictureId)
            .then( function (response) {
                dispatch(successStatus(response.status, "Image supprimée avec succès"));
                return dispatch(getPictureForProfil(userId, 0, []));
            })
            .catch(function (error) {
                return dispatch(errorStatus(error.response.status, error.response.data.message));
            });
    }
}
export type Action = AuthenticatedAction
