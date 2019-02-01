import { combineReducers } from 'redux'
import * as fromAuth from "./Authentifcation/auth";
import * as fromProfil from "./Profil/Profil";

/*
 * This is the root state of the app
 * It contains every substate of the app
 */
export interface State {
    auth: fromAuth.IStateAuthApp
    profil: fromProfil.IStateProfilApp
}

/*
 * initialState of the app
 */
export const initialState: State = {
    auth: fromAuth.initialState,
    profil: fromProfil.initialState
};

/*
 * Root reducer of the app
 * Returned reducer will be of type Reducer<State>
 */
export const reducer = combineReducers<State>({
    auth: fromAuth.reducer,
    profil: fromProfil.reducer
});