import {Action, ActionTypes} from '../../actions/Authentification/auth'
import User from "../../models/User";


export interface IStateAuthApp {
    user: User
    isAuthenticated: boolean
    token: string
}

export const initialState: IStateAuthApp = {
    user: {},
    isAuthenticated: false,
    token:null
};

export function reducer(state: IStateAuthApp = initialState, action: Action) : IStateAuthApp {
    switch (action.type) {
        case ActionTypes.AUTHENTICATED:
            const {user, token} = action.payload;
            return {
                ...state,
                user: user,
                token: token,
                isAuthenticated: true
            };
        default:
            return state
    }
}
