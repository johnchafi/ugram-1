import {Dispatch} from "redux";
import {IStateSearch} from "../../reducers/Search/Search";
import {sdk} from "../../sdk/ugram";
import Picture from "../../models/Picture";
import User from "../../models/User";

export enum ActionTypes {
    ERROR = "ERROR_SEARCH",
    SUCCESS = "SUCCESS_SEARCH",
}
export interface SearchAction { type: ActionTypes, payload: IStateSearch }
export function handleSearch(search : string) : any {
    return function(dispatch: Dispatch<IStateSearch>) {
        search = search.toLowerCase();
        sdk.getPictures(0)
            .then(  function (response) {

                let picturesDescription: Picture[] = [];
                let picturesTags: Picture[] = [];

                response.data.items.map(function (picture: Picture) {

                    if (picture.description && picture.description.toLowerCase().includes(search)) {
                        picturesDescription.push(picture);
                    }
                    if (picture.tags) {
                        let check = true;
                        picture.tags.map(function (tag: string) {
                            if (tag.toLowerCase().includes(search) && check) {
                                check = false;
                                picturesTags.push(picture);
                            }
                        });
                    }
                });
                // REMOVE DUPLICATE
                picturesDescription.map(function (picture : Picture) {
                    let i = 0;
                    picturesTags.map(function (pictureTag : Picture) {
                        if (picture.id === pictureTag.id) {
                            if (picturesTags.length == 1) {
                                picturesTags = [];
                            }
                            else {
                                picturesTags.slice(i, 1);
                            }
                        }
                        i++;
                    });
                });
                picturesDescription = removeDuplicatePicture(picturesDescription);
                picturesTags = removeDuplicatePicture(picturesTags);
                sdk.getUsers()
                    .then(function (response) {
                        let users: User[] = [];
                        response.data.items.map(function (user: User) {
                            if (user.id && user.id.toLowerCase().includes(search)) {
                                users.push(user);
                            }
                            else if (user.firstName && user.firstName.toLowerCase().includes(search)) {
                                users.push(user);
                            }
                            else if (user.lastName && user.lastName.toLowerCase().includes(search)) {
                                users.push(user);
                            }
                        });
                        dispatch({
                            type: ActionTypes.SUCCESS,
                            payload: {
                                picturesDescription: picturesDescription,
                                picturesTags: picturesTags,
                                users: users
                            }
                        })
                    })
                    .catch(function (error) {
                        dispatch( {
                            type: ActionTypes.ERROR,
                            payload: {
                                pictures: null,
                                tags : null,
                                users : null
                            }
                        })
                    });
            })
            .catch(function (error) {
                dispatch( {
                    type: ActionTypes.ERROR,
                    payload: {
                        pictures: null,
                        tags : null

                    }
                })
            })
    }
}

function removeDuplicatePicture(arr) {
    arr.map(function (picture : Picture) {
        let i = 0;
        arr.map(function (other : Picture) {
            if (picture.id === other.id) {
                arr.slice(i, 1);
            }
            i++;
        });
    });
    return arr;
}

export type Action = SearchAction
