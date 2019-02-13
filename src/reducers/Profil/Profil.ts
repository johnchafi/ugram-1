import {Action, ActionTypes} from '../../actions/Profil/profil'
import User from "../../models/User";
import Picture from "../../models/Picture";


export interface IStateProfilApp {
    isAuthenticated: boolean
    user: User,
    pictures: Picture[],
    totalEntries: number
}

// Define our initialState
export const initialState: IStateProfilApp = {
    isAuthenticated: false,
    user: {},
    pictures: [],
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
            };
        default:
            return state
    }
}
