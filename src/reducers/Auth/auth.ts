import { ActionTypes, Action } from '../../actions/auth'


export interface IStateAuthApp {
    isAuthenticated: boolean
}

// Define our initialState
export const initialState: IStateAuthApp = {
    isAuthenticated: false
};

/*
 * Reducer takes 2 arguments
 * state: The state of the reducer. By default initialState ( if there was no state provided)
 * action: Action to be handled. Since we are in todos reducer, action type is Action defined in our actions/todos file.
 */
export function reducer(state: IStateAuthApp = initialState, action: Action) {
    console.log("action du reducers  : " + action.type);
    switch (action.type) {
        default:
            return state
    }
}