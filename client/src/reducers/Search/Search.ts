import {ActionTypes, Action} from "../../actions/Search/Search";
import Picture from "../../models/Picture";
import User from "../../models/User";

export interface IStateSearch {
    picturesDescription : Picture[],
    picturesTags : Picture[],
    users : User[]
}

// Define our initialState
export const initialState: IStateSearch = {
    picturesDescription : [],
    picturesTags : [],
    users : []
};

export function reducer(state: IStateSearch = initialState, action: Action) : IStateSearch {
    switch (action.type) {
        case ActionTypes.SUCCESS:
            return {
                ...state,
                picturesDescription : action.payload.picturesDescription,
                picturesTags : action.payload.picturesTags,
                users : action.payload.users

            };
        case ActionTypes.ERROR:
            return {
                ...state,
            };
        default:
            return state
    }
}
