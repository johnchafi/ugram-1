import { IStateProfilApp } from "../../reducers/Profil/Profil";
export declare enum ActionTypes {
    AUTHENTICATED = "AUTH",
    ERROR = "ERROR"
}
export interface AuthenticatedAction {
    type: ActionTypes.AUTHENTICATED;
    payload: IStateProfilApp;
}
export declare function authUser(): any;
export declare type Action = AuthenticatedAction;
