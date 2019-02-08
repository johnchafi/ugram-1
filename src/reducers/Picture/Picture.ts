import {Action, ActionTypes} from '../../actions/Picture/picture'
import Picture from "../../models/Picture";


export interface IStatePictureApp {
    isAuthenticated: boolean
    pictures: Picture[],
    finish: boolean
    pageNumber: number
}

export const initialState: IStatePictureApp = {
    isAuthenticated: false,
    pictures: [],
    finish:false,
    pageNumber:0
};
export function reducer(state: IStatePictureApp = initialState, action: Action) : IStatePictureApp {
    switch (action.type) {
        case ActionTypes.GET_PICTURE_HOME:
            return Object.assign({}, state, {
                    finish:action.payload.finish,
                    pictures: action.payload.pictures,
                    isAuthenticated: action.payload.isAuthenticated,
                    pageNumber: action.payload.pageNumber
                });
        case ActionTypes.ERROR:
            return {
                ...state,
            };
        case ActionTypes.GET_PICTURE_HOME_FINISH:
            return Object.assign({}, state, {
                finish:action.payload.finish,
                pictures: action.payload.pictures,
            });
        case ActionTypes.GET_PICTURE_PROFIL:
            return Object.assign({}, state, {
                pictures: action.payload.pictures,
                pageNumber: action.payload.pageNumber,
                isAuthenticated: action.payload.isAuthenticated,
            });
        case ActionTypes.RESET:
            return initialState;
        default:
            return state
    }
}
