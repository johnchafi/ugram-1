import {IStateStatusApp} from "../../reducers/Status/Status";
import {Dispatch} from "redux";


export enum ActionTypes {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}
export interface StatusAction { type: ActionTypes, payload: IStateStatusApp }
export type Action = StatusAction


export function errorStatus(status: number, message: string)
{
    return {
        type: ActionTypes.ERROR,
        payload: {
            status: status,
            message: message,
            variant: "error"
        }
    };
}

export function successStatus(status: number, message: string)
{
    return {
        type: ActionTypes.SUCCESS,
        payload: {
            status: status,
            message: message,
            variant:"success"
        }
    };
}
