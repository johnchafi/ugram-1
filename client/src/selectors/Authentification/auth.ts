import { State } from '../../reducers'
import { createSelector } from 'reselect'

const getIsAuth = ((state: State) => state.auth);

export const getAuth = createSelector([getIsAuth], s => s.isAuthenticated);
export const getAuthUser = createSelector([getIsAuth], s => s.user);
export const getTokenUser = createSelector([getIsAuth], s => s.token);
export const getMessageErrorAuth = createSelector([getIsAuth], s => s.message);
