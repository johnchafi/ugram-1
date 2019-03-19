import {Action, ActionTypes} from "../../actions/Profil/profil";
import User from "../../models/User";
import Picture from "../../models/Picture";

export interface IStateProfilApp {
    isAuthenticated: boolean
    user: User,
    pictures: Picture[],
    totalEntries: number
}

export const initialState: IStateProfilApp = {
    isAuthenticated: false,
    user: {},
    pictures: [],
    totalEntries: 0
};

export function reducer(state: IStateProfilApp = initialState, action: Action) : IStateProfilApp {
    switch (action.type) {
        case ActionTypes.PROFIL:
            return {
                ...state,
                user: action.payload.user,
            };
        case ActionTypes.ERROR:
            return {
                ...state,
                user: action.payload.user,
            };
        default:
            return state
    }
}
