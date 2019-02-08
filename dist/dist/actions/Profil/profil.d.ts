import { IStateProfilApp } from "../../reducers/Profil/Profil";
import User from "../../models/User";
export declare enum ActionTypes {
    PROFIL = "PROFIL",
    CLOSE_EDIT_PROFIL = "CLOSE_EDIT_PROFIL",
    ERROR = "ERROR"
}
export interface UserProfilAction {
    type: ActionTypes;
    payload: IStateProfilApp;
}
export declare function closeEdit(user: User): any;
export declare function editUser(user: User): any;
export declare function profilData(userid: any): any;
export declare type Action = UserProfilAction;
