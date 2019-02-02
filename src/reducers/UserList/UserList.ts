import {Action, ActionTypes} from '../../actions/UserList/userList'
import UserList from "../../components/UserList/UserList";


export interface IStateUsersApp {
    isAuthenticated: boolean
    users: UserList[]
}

// Define our initialState
export const initialState: IStateUsersApp = {
    isAuthenticated: false,
    users: []
};

/*
 * Reducer takes 2 arguments
 * state: The state of the reducer. By default initialState ( if there was no state provided)
 * action: Action to be handled. Since we are in todos reducer, action type is Action defined in our actions/todos file.
 */
export function reducer(state: IStateUsersApp = initialState, action: Action) : IStateUsersApp {
    switch (action.type) {
        case ActionTypes.GET_USERS:
            const {users, isAuthenticated} = action.payload;
            return {
                ...state,
                users: users,
                isAuthenticated: isAuthenticated,
            };
        default:
            return state
    }
}
