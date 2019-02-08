import { IStateUsersApp } from "../../reducers/Users/UserList";
export declare enum ActionTypes {
    GET_USERS = "GET_USERS",
    ERROR = "ERROR"
}
export interface AuthenticatedAction {
    type: ActionTypes;
    payload: IStateUsersApp;
}
export declare function getAllUsers(): any;
export declare type Action = AuthenticatedAction;
