import { createSelector } from "reselect";
import {State} from "../../reducers";

const getNotifications = ((state: State) => state.notification);

export const getNotificationsUser = createSelector([getNotifications], s => s.notifications);
