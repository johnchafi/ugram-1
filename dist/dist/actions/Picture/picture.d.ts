import { IStatePictureApp } from "../../reducers/Picture/Picture";
import Picture from "../../models/Picture";
export declare enum ActionTypes {
    GET_PICTURE_HOME = "GET_PICTURE_HOME",
    GET_PICTURE_HOME_FINISH = "GET_PICTURE_HOME_FINISH",
    GET_PICTURE_PROFIL = "GET_PICTURE_PROFIL",
    RESET = "RESET",
    ERROR = "ERROR"
}
export interface AuthenticatedAction {
    type: ActionTypes;
    payload: IStatePictureApp;
}
export declare function getPictureForProfil(userid: string, pageNumber: number, pictures: Picture[]): any;
export declare function getAllPicturesSortByDate(pageNumber: number, pictures: Picture[]): any;
export declare function resetProfil(): any;
export declare function reset(): any;
export declare function getUserForPicture(pictures: Picture[]): any;
export declare function editPicture(picture: Picture): any;
export declare function deletePicture(userId: string, pictureId: number): any;
export declare type Action = AuthenticatedAction;
