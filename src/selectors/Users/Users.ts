import { createSelector } from 'reselect'
import {State} from "../../reducers";

const getUsersData = ((state: State) => state.users);

export const getUsers = createSelector([getUsersData], s => s.users);
export const getIsAuthenticated = createSelector([getUsersData], s => s.isAuthenticated);
