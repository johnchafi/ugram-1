import {ActionTypes, Action} from "../../actions/Search/Search";
import Picture from "../../models/Picture";

export interface IStateSearch {
    picturesDescription : Picture[],
    picturesTags : Picture[]
}

// Define our initialState
export const initialState: IStateSearch = {
    picturesDescription : [],
    picturesTags : []
};

export function reducer(state: IStateSearch = initialState, action: Action) : IStateSearch {
    switch (action.type) {
        case ActionTypes.SUCCESS:
            return {
                ...state,
                picturesDescription : action.payload.picturesDescription,
                picturesTags : action.payload.picturesTags

            };
        case ActionTypes.ERROR:
            return {
                ...state,
            };
        default:
            return state
    }
}
