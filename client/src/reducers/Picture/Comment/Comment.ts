import {Action, ActionTypes} from "../../../actions/Comment/comment";
import {Comment} from "../../../models/Comment";

export interface IStateComment {
    comments: Comment[],
    comment : Comment,
    id : number,
    load : boolean
}

export const initialState: IStateComment = {
    comments: [],
    comment: null,
    id : null,
    load : false
};

export function reducer(state: IStateComment = initialState, action: Action) : IStateComment {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload.comment],
                load : false
            };
        case ActionTypes.ADD_COMMENT_IN_DB:
            return {
                ...state,
                load : true
            };
        case ActionTypes.DELETE_COMMENT: {

            return {
                ...state,
                    comments: [... state.comments.filter(comment => {
                        return comment.id != action.payload.id
                    })]
            };
        }
        case ActionTypes.UPDATE_COMMENT:
            return {
                ...state,
                comments: action.payload.comments,
            };
        default:
            return state
    }
}
