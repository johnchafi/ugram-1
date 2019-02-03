import {Action, ActionTypes} from '../../actions/PictureList/pictureList'
import Picture from "../../models/Picture";


export interface IStatePicturesApp {
    isAuthenticated: boolean
    pictures: Picture[]
}

// Define our initialState
export const initialState: IStatePicturesApp = {
    isAuthenticated: false,
    pictures: []
};

/*
 * Reducer takes 2 arguments
 * state: The state of the reducer. By default initialState ( if there was no state provided)
 * action: Action to be handled. Since we are in todos reducer, action type is Action defined in our actions/todos file.
 */
export function reducer(state: IStatePicturesApp = initialState, action: Action) : IStatePicturesApp {
    switch (action.type) {
        case ActionTypes.GET_PICTURES:
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
