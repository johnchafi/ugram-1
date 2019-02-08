import * as fromAuth from "./Authentifcation/auth";
import * as fromProfil from "./Profil/Profil";
import * as fromUsers from "./Users/UserList";
import * as fromHome from "./Picture/Picture";
export interface State {
    auth: fromAuth.IStateAuthApp;
    profil: fromProfil.IStateProfilApp;
    users: fromUsers.IStateUsersApp;
    picture: fromHome.IStatePictureApp;
}
export declare const initialState: State;
export declare const reducer: import("redux").Reducer<State>;
