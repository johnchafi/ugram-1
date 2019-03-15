import {Action, ActionTypes} from '../../actions/Authentification/auth'
import User from "../../models/User";


export interface IStateAuthApp {
    user: User
    isAuthenticated: boolean
}

export const initialState: IStateAuthApp = {
    user: {},
    isAuthenticated: false,
};

export function reducer(state: IStateAuthApp = initialState, action: Action) : IStateAuthApp {
    switch (action.type) {
        case ActionTypes.AUTHENTICATED:
            const {user} = action.payload;
            return {
                ...state,
                user: user,
                isAuthenticated: true
            };
        default:
            return state
    }
}
