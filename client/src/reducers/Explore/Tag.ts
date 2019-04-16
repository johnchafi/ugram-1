import {Action, ActionTypes} from "../../actions/Explore/tag";
import Picture from "../../models/Picture";
export interface IStateTags {
    pictures: Picture[],
    tag: string,
}

// Define our initialState
export const initialState: IStateTags = {
    pictures: [],
    tag: null,
};

export function reducer(state: IStateTags = initialState, action: Action) : IStateTags {
    switch (action.type) {
        case ActionTypes.GET_PICTURES:
            const {pictures, tag} = action.payload;
            return {
                ...state,
                pictures: pictures,
                tag: tag
            };
        case ActionTypes.ERROR:
            return {
                ...state,
            };
        default:
            return state
    }
}
