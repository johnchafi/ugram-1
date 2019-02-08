import { Action } from '../../actions/Picture/picture';
import Picture from "../../models/Picture";
export interface IStatePictureApp {
    isAuthenticated: boolean;
    pictures: Picture[];
    finish: boolean;
    pageNumber: number;
}
export declare const initialState: IStatePictureApp;
export declare function reducer(state: IStatePictureApp, action: Action): IStatePictureApp;
