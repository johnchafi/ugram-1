import {Action, ActionTypes} from '../../actions/Authentification/auth'


export interface IStateAuthApp {
    user: string
    isAuthenticated: boolean
    token: string
    message: string
}

export const initialState: IStateAuthApp = {
    user: null,
    isAuthenticated: false,
    token : null,
    message: null
};

export function reducer(state: IStateAuthApp = initialState, action: Action) : IStateAuthApp {
    switch (action.type) {
        case ActionTypes.AUTHENTICATED:
            const {user, token} = action.payload;
            return {
                ...state,
                user: user,
                isAuthenticated: true,
                token: token
            };
        case ActionTypes.ERROR:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                token: null,
            };
        default:
            return state
    }
}
