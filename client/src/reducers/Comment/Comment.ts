import {Action, ActionTypes} from "../../actions/Comment/comment";
import {Comment} from "../../models/Comment";


export interface IStateComment {
    comments: Comment[],
}

export const initialState: IStateComment = {
    comments: []
};

export function reducer(state: IStateComment = initialState, action: Action) : IStateComment {
    switch (action.type) {

        case ActionTypes.ADD_COMMENT:
            return {
                ...state,
                comments: action.payload.comments,
            };
        case ActionTypes.ADD_USER:
            return {
                ...state,
                comments: action.payload.comments,
            };
        case ActionTypes.DELETE_COMMENT:
            return {
                ...state,
                comments: action.payload.comments,
            };
        case ActionTypes.UPDATE_COMMENT:
            return {
                ...state,
                comments: action.payload.comments,
            };
        default:
            return state
    }
}
