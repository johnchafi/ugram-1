import {Dispatch} from "redux";
import {sdk} from "../../sdk/ugram";
import {errorStatus} from "../Status/status";
import {IStateNotifications} from "../../reducers/Notification/Notification";

export enum ActionTypes {
    UPDATE_NOTIF = "UPDATE_NOTIF"
}

export interface NotificationAction { type: ActionTypes, payload: IStateNotifications }

export function getNotifications(userId : string) : any {
    return function(dispatch : Dispatch<IStateNotifications>) {
        sdk.getNotifications(userId).then( function (response) {
            console.log(response.data.items);
            return dispatch({
                type: ActionTypes.UPDATE_NOTIF,
                payload: {
                    notifications: response.data.items,
                }
            });
        })
            .catch(function (error) {
                return dispatch(errorStatus(error.response.status, error.response.data.message));
            });
    }
}

export type Action = NotificationAction
