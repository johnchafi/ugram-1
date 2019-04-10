import {IStateUsersApp} from "../../reducers/Users/UserList";
import {Dispatch} from "redux";
import { sdk } from "../../sdk/ugram";
import User from "../../models/User";
import Picture from "../../models/Picture";

export enum ActionTypes {
    GET_USERS = "GET_USERS",
    ERROR = "ERROR",
}
export interface AuthenticatedAction { type: ActionTypes, payload: IStateUsersApp }

export function getAllUsers(pageNumber : number, users: User[]): any {
    return function(dispatch : Dispatch<IStateUsersApp>) {
        let results: User[] = [];
        sdk.getUsers(pageNumber)
            .then(function (response) {
                users.map(function (user : User) {results.push(Object.assign({}, user))}.bind(results));
                response.data.items.map(function (user : User) {results.push(Object.assign({}, user))}.bind(results));
                if (response.data.totalPages > pageNumber) {
                    pageNumber = pageNumber + 1;
                }
                dispatch(  {
                    type: ActionTypes.GET_USERS,
                    payload: {
                        users: results,
                        pageNumber: pageNumber,
                    }
                })
            })
            .catch(function (error) {
                dispatch( {
                    type: ActionTypes.ERROR,
                    payload: {
                        users: null,
                    }
                })
            });
    }
}
export type Action = AuthenticatedAction
