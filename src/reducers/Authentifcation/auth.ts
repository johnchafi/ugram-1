import {Action, ActionTypes} from '../../actions/Authentification/auth'
import User from "../../models/User";


export interface IStateAuthApp {
    user: User
    isAuthenticated: boolean
    status: number
}

export const initialState: IStateAuthApp = {
    user: {},
    isAuthenticated: false,
    status: 0
};

export function reducer(state: IStateAuthApp = initialState, action: Action) : IStateAuthApp {
    switch (action.type) {
        case ActionTypes.AUTHENTICATED:
            const {user, status} = action.payload;
            return {
                ...state,
                user: user,
                status: status
            };
        default:
            return state
    }
}
