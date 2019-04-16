import {Action, ActionTypes} from "../../actions/Explore/explore";
import User from "../../models/User";
import PopularTag from "../../models/PopularTag";

export interface IStateUsersApp {
    isAuthenticated: boolean
    users: User[],
    tags: PopularTag[],
    pageNumber : number
}

// Define our initialState
export const initialState: IStateUsersApp = {
    isAuthenticated: false,
    users: [],
    tags: [],
    pageNumber : 0
};

export function reducer(state: IStateUsersApp = initialState, action: Action) : IStateUsersApp {
    switch (action.type) {
        case ActionTypes.GET_USERS:
            const {users, pageNumber} = action.payload;
            return {
                ...state,
                users: users,
                pageNumber : pageNumber
            };
        case ActionTypes.GET_TAGS:
            const {tags} = action.payload;
            return {
                ...state,
                tags: tags
            };
        default:
            return state
    }
}
