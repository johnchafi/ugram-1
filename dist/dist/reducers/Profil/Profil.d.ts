import { Action } from '../../actions/Profil/profil';
import User from "../../models/User";
import Picture from "../../models/Picture";
export interface IStateProfilApp {
    isAuthenticated: boolean;
    user: User;
    status: number;
    pictures: Picture[];
    message: string;
}
export declare const initialState: IStateProfilApp;
export declare function reducer(state: IStateProfilApp, action: Action): IStateProfilApp;
