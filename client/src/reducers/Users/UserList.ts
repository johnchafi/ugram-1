import {Action, ActionTypes} from "../../actions/User/users";
import UserList from "../../components/Users/UserList";

export interface IStateUsersApp {
    isAuthenticated: boolean
    users: UserList[],
    pageNumber : number
}

// Define our initialState
export const initialState: IStateUsersApp = {
    isAuthenticated: false,
    users: [],
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
        default:
            return state
    }
}
