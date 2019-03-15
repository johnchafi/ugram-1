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
<<<<<<< HEAD
                token: token,
=======
>>>>>>> ca6a2c86ceddfc709f50f0c691f5ffcdfaf53623
                isAuthenticated: true
            };
        default:
            return state
    }
}
