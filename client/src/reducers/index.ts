import { combineReducers } from 'redux'
import * as fromAuth from "./Authentifcation/auth";
import * as fromProfil from "./Profil/Profil";
import * as fromUsers from "./Users/UserList";
import * as fromHome from "./Picture/Picture";
import * as fromStatus from "./Status/Status";
import * as fromSearch from "./Search/Search";
/*
 * This is the root state of the app
 * It contains every substate of the app
 */
export interface State {
    auth: fromAuth.IStateAuthApp
    profil: fromProfil.IStateProfilApp
    users: fromUsers.IStateUsersApp,
    picture: fromHome.IStatePictureApp,
    status: fromStatus.IStateStatusApp,
    search: fromSearch.IStateSearch
}

/*
 * initialState of the app
 */
export const initialState: State = {
    auth: fromAuth.initialState,
    profil: fromProfil.initialState,
    users: fromUsers.initialState,
    picture: fromHome.initialState,
    status: fromStatus.initialState,
    search: fromSearch.initialState
};



/*
 * Root reducer of the app
 * Returned reducer will be of type Reducer<State>
 */
export const reducer = combineReducers<State>({
    auth: fromAuth.reducer,
    profil: fromProfil.reducer,
    users: fromUsers.reducer,
    picture: fromHome.reducer,
    status: fromStatus.reducer,
    search: fromSearch.reducer
});

