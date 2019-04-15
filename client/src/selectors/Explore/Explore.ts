import { createSelector } from "reselect";
import {State} from "../../reducers";

const getUsersData = ((state: State) => state.users);

export const getUsers = createSelector([getUsersData], s => s.users);
export const getTags = createSelector([getUsersData], s => s.tags);

export const getPageNumber = createSelector([getUsersData], s => s.pageNumber);
