import {Dispatch} from "redux";
import {IStateSearch} from "../../reducers/Search/Search";
import {sdk} from "../../sdk/ugram";
import Picture from "../../models/Picture";

export enum ActionTypes {
    ERROR = 'ERROR_SEARCH',
    SUCCESS = 'SUCCESS_SEARCH',
}

export interface SearchAction { type: ActionTypes, payload: IStateSearch }


export function handleSearch(search : string) : any {

    return function(dispatch: Dispatch<IStateSearch>) {
        sdk.getPictures(0)
            .then(  function (response) {

                let picturesDescription: Picture[] = [];
                let picturesTags: Picture[] = [];

                response.data.items.map(function (picture: Picture) {
                    if (picture.description && picture.description.includes(search))
                        picturesDescription.push(picture);
                    if (picture.tags) {
                        picture.tags.map(function (tag: string) {
                            if (tag.includes(search)) {
                                picturesTags.push(picture);
                            }
                        })
                    }
                });
                dispatch({
                    type: ActionTypes.SUCCESS,
                    payload: {
                        picturesDescription: picturesDescription,
                        picturesTags: picturesTags
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
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

export type Action = SearchAction
