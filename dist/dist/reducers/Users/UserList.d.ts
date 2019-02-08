import { Action } from '../../actions/User/users';
import UserList from "../../components/Users/UserList";
export interface IStateUsersApp {
    isAuthenticated: boolean;
    users: UserList[];
}
export declare const initialState: IStateUsersApp;
export declare function reducer(state: IStateUsersApp, action: Action): IStateUsersApp;
