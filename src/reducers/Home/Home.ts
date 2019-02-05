import {Action, ActionTypes} from '../../actions/Picture/picture'
import Picture from "../../models/Picture";


export interface IStateHomeApp {
    isAuthenticated: boolean
    pictures: Picture[],
    finish: boolean
}

export const initialState: IStateHomeApp = {
    isAuthenticated: false,
    pictures: null,
    finish:false
};
export function reducer(state: IStateHomeApp = initialState, action: Action) : IStateHomeApp {
    switch (action.type) {
        case ActionTypes.GET_PICTURE_HOME:
            return {
                ...state,
                finish:action.payload.finish,
                pictures: action.payload.pictures,
                isAuthenticated: action.payload.isAuthenticated,
            };
        case ActionTypes.ERROR:
            return {
                ...state,
            };
        case ActionTypes.GET_PICTURE_HOME_FINISH:
            return {
                ...state,
                finish:action.payload.finish,
                pictures: action.payload.pictures,
            };
        default:
            return state
    }
}
