import { Action } from '../../actions/Authentification/auth';
import User from "../../models/User";
export interface IStateAuthApp {
    user: User;
    isAuthenticated: boolean;
    status: number;
}
export declare const initialState: IStateAuthApp;
export declare function reducer(state: IStateAuthApp, action: Action): IStateAuthApp;
