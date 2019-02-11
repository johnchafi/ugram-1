import {Action, ActionTypes} from '../../actions/Profil/profil'
import User from "../../models/User";
import Picture from "../../models/Picture";


export interface IStateProfilApp {
    isAuthenticated: boolean
    user: User,
    status: number,
    pictures: Picture[],
    message:string
    totalEntries: number
}

// Define our initialState
export const initialState: IStateProfilApp = {
    isAuthenticated: false,
    user: {},
    status: 200,
    pictures: [],
    message:null,
    totalEntries: 0
};

/*
 * Reducer takes 2 arguments
 * state: The state of the reducer. By default initialState ( if there was no state provided)
 * action: Action to be handled. Since we are in todos reducer, action type is Action defined in our actions/todos file.
 */
export function reducer(state: IStateProfilApp = initialState, action: Action) : IStateProfilApp {
    switch (action.type) {
        case ActionTypes.PROFIL:
            return {
                ...state,
                user: action.payload.user,
                status: 200
            };
        case ActionTypes.ERROR:
            return {
                ...state,
                message: action.payload.message,
                status:action.payload.status
            };
        case ActionTypes.CLOSE_EDIT_PROFIL:
            return {
                ...state,
                user: action.payload.user
            };
        default:
            return state
    }
}
