import { combineReducers } from 'redux'
import * as fromAuth from "./Authentifcation/auth";
import * as fromProfil from "./Profil/Profil";
import * as fromUsers from "./Users/UserList";
import * as fromHome from "./Picture/Picture";
/*
 * This is the root state of the app
 * It contains every substate of the app
 */
export interface State {
    auth: fromAuth.IStateAuthApp
    profil: fromProfil.IStateProfilApp
    users: fromUsers.IStateUsersApp,
    picture: fromHome.IStatePictureApp
}

/*
 * initialState of the app
 */
export const initialState: State = {
    auth: fromAuth.initialState,
    profil: fromProfil.initialState,
    users: fromUsers.initialState,
    picture: fromHome.initialState
};



/*
 * Root reducer of the app
 * Returned reducer will be of type Reducer<State>
 */
export const reducer = combineReducers<State>({
    auth: fromAuth.reducer,
    profil: fromProfil.reducer,
    users: fromUsers.reducer,
    picture: fromHome.reducer
});

