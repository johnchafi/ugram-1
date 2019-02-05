import {Action, ActionTypes} from '../../actions/Picture/picture'
import Picture from "../../models/Picture";


export interface IStateHomeApp {
    isAuthenticated: boolean
    pictures: Picture[]
}

export const initialState: IStateHomeApp = {
    isAuthenticated: false,
    pictures: []
};
export function reducer(state: IStateHomeApp = initialState, action: Action) : IStateHomeApp {
    switch (action.type) {
        case ActionTypes.GET_PICTURE_HOME:
            const {pictures, isAuthenticated} = action.payload;
            return {
                ...state,
                pictures: pictures,
                isAuthenticated: isAuthenticated,
            };
        default:
            return state
    }
}
