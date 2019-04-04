import {Action, ActionTypes} from "../../../actions/Like/like";
import {Like} from "../../../models/Like";


export interface IStateLike {
    likes: Like[],
}

export const initialState: IStateLike = {
    likes: []
};

export function reducer(state: IStateLike = initialState, action: Action) : IStateLike {
    switch (action.type) {
        case ActionTypes.UPDATE_LIKE:
            return {
                ...state,
                likes: action.payload.likes,
            };
        default:
            return state
    }
}
