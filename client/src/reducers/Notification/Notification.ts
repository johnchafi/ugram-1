import {Action, ActionTypes} from "../../actions/Notifications/notifications";
import {Notification} from "../../models/Notification";

export interface IStateNotifications {
    notifications: Notification[],
}

export const initialState: IStateNotifications = {
    notifications: []
};

export function reducer(state: IStateNotifications = initialState, action: Action) : IStateNotifications {
    switch (action.type) {
        case ActionTypes.UPDATE_NOTIF:
            return {
                ...state,
                notifications: action.payload.notifications,
            };
        default:
            return state
    }
}
