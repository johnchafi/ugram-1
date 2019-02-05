import { combineReducers } from 'redux'
import * as fromAuth from "./Authentifcation/auth";
import * as fromProfil from "./Profil/Profil";
import * as fromUsers from "./UserList/UserList";
import * as fromHome from "./Home/Home";
/*
 * This is the root state of the app
 * It contains every substate of the app
 */
export interface State {
    auth: fromAuth.IStateAuthApp
    profil: fromProfil.IStateProfilApp
    users: fromUsers.IStateUsersApp,
    home: fromHome.IStateHomeApp
}

/*
 * initialState of the app
 */
export const initialState: State = {
    auth: fromAuth.initialState,
    profil: fromProfil.initialState,
    users: fromUsers.initialState,
    home: fromHome.initialState
};



/*
 * Root reducer of the app
 * Returned reducer will be of type Reducer<State>
 */
export const reducer = combineReducers<State>({
    auth: fromAuth.reducer,
    profil: fromProfil.reducer,
    users: fromUsers.reducer,
    home: fromHome.reducer
});

