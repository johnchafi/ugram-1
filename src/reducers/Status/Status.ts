import {Action, ActionTypes} from "../../actions/Status/status";


export interface IStateStatusApp {
    message : string
    status: number
    variant: string
    open: boolean
}

export const initialState: IStateStatusApp = {
    message: "",
    status: 200,
    variant: "success",
    open: false
};
export function reducer(state: IStateStatusApp = initialState, action: Action) : IStateStatusApp {
    switch (action.type) {
        case ActionTypes.SUCCESS:
            return Object.assign({}, state, {
                message: action.payload.message,
                status: action.payload.status,
                variant: action.payload.variant,
                open: true
            });
        case ActionTypes.ERROR:
            return Object.assign({}, state, {
                message: action.payload.message,
                status: action.payload.status,
                variant: action.payload.variant,
                open: true
            });
        default:
            return state
    }
}
