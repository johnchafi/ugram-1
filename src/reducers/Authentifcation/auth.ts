import {Action, ActionTypes} from '../../actions/Authentification/auth'
import User from "../../models/User";


export interface IStateAuthApp {
    user: User
    isAuthenticated: boolean
    status: number
}

// Define our initialState
export const initialState: IStateAuthApp = {
    user: new class implements User {},
    isAuthenticated: false,
    status: 0
};

/*
 * Reducer takes 2 arguments
 * state: The state of the reducer. By default initialState ( if there was no state provided)
 * action: Action to be handled. Since we are in todos reducer, action type is Action defined in our actions/todos file.
 */
export function reducer(state: IStateAuthApp = initialState, action: Action) : IStateAuthApp {
    switch (action.type) {
        case ActionTypes.AUTHENTICATED:
            const {user, isAuthenticated, status} = action.payload;
            return {
                ...state,
                user: user,
                isAuthenticated: isAuthenticated,
                status: status
            };
        default:
            return state
    }
}
