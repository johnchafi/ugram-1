import {Action, ActionTypes} from "../../actions/User/users";
import UserList from "../../components/Users/UserList";

export interface IStateUsersApp {
    isAuthenticated: boolean
    users: UserList[]
}

// Define our initialState
export const initialState: IStateUsersApp = {
    isAuthenticated: false,
    users: []
};

export function reducer(state: IStateUsersApp = initialState, action: Action) : IStateUsersApp {
    switch (action.type) {
        case ActionTypes.GET_USERS:
            const {users} = action.payload;
            return {
                ...state,
                users: users,
            };
        default:
            return state
    }
}
