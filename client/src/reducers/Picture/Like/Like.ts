import {Action, ActionTypes} from "../../../actions/Like/like";
import {Like} from "../../../models/Like";

export interface IStateLike {
    likes: Like[],
    like : Like,
    id : number,
    load: boolean
}

export const initialState: IStateLike = {
    likes: [],
    like : null,
    id : null,
    load: false
};

export function reducer(state: IStateLike = initialState, action: Action) : IStateLike {
    switch (action.type) {
        case ActionTypes.UPDATE_LIKE:
            return {
                ...state,
                likes: action.payload.likes,
            };
        case ActionTypes.ADD_LIKE:
            return {
                ...state,
                likes: [...state.likes, action.payload.like],
                load : false
            };
        case ActionTypes.ADD_LIKE_IN_DB:
            return {
                ...state,
               load : true
            };
        case ActionTypes.DELETE_LIKE: {
            return {
                ...state,
                likes: [... state.likes.filter(like => {
                    return like.id != action.payload.id
                })]
            };
        }
        default:
            return state
    }
}
