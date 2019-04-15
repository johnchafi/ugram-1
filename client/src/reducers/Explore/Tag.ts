import {Action, ActionTypes} from "../../actions/Explore/tag";
import Picture from "../../models/Picture";

export interface IStateProfilApp {
    isAuthenticated: boolean,
    tag: string,
    pictures: Picture[]
}

export const initialState: IStateProfilApp = {
    isAuthenticated: false,
    tag: "",
    pictures: null
};

export function reducer(state: IStateProfilApp = initialState, action: Action) : IStateProfilApp {
    switch (action.type) {
        case ActionTypes.GET_PICTURES:
            return {
                ...state,
            };
        case ActionTypes.ERROR:
            return {
                ...state,
            };
        default:
            return state
    }
}
