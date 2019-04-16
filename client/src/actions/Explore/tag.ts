import {IStateTags} from "../../reducers/Explore/Tag";
import {Dispatch} from "redux";
import { sdk } from "../../sdk/ugram";
import Picture from "../../models/Picture";
import User from "../../models/User";
import axios from "axios";

export enum ActionTypes {
    GET_PICTURES = "GET_PICTURES",
    ERROR = "ERROR",
}
export interface AuthenticatedAction { type: ActionTypes, payload: IStateTags }

export function getAllPicturesByTag(pageNumber : number, tag : string): any {
    return function(dispatch : Dispatch<IStateTags>) {
        sdk.getPicturesByTag(tag)
            .then(async function (response) {
                let pictures : Picture[] = response.data.items;
                let results: Picture[] = [];
                let users : User[] = [];

                users = await sdk.getAllUsers().then(function (response) {
                    return response.data.items;
                }).catch(error => {

                });

                pictures.map(function (picture : Picture) {
                    for (let i = 0; i < users.length; i++) {
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

                dispatch( {
                    type: ActionTypes.GET_PICTURES,
                    payload: {
                        pictures: results,
                        tag: tag
                    }
                })
            })
            .catch(function (error) {
                dispatch( {
                    type: ActionTypes.ERROR,
                    payload: {
                        pictures: null,
                        tag: null,
                    }
                })
            });
    }
}
export type Action = AuthenticatedAction
