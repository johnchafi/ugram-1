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
            console.log(response);
            if (response.data === "")
                response.data = [];
            return dispatch({
                type: ActionTypes.UPDATE_NOTIF,
                payload: {
                    notifications: response.data,
                }
            });
        })
            .catch(function (error) {
                return dispatch(errorStatus(error.response.status, error.response.data.message));
            });
    }
}


/*
 * Define the Action type
 * It can be one of the types defining in our action/todos file
 * It will be useful to tell typescript about our types in our reducer
 */
export type Action = NotificationAction
