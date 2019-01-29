import { IStateAuthApp } from '../reducers/Auth/auth'
import { createSelector } from 'reselect'

/*
 * Get the todos state from the root state
 */
const getIsAuth = ((state: IStateAuthApp) => state.isAuthenticated);

/*
 * Getting todos array from todos State
 */
export const getAuth = createSelector([getIsAuth], s => s)