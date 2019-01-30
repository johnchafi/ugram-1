import { IStateAuthApp } from '../../reducers/Authentifcation/auth'
import { createSelector } from 'reselect'

const getIsAuth = ((state: IStateAuthApp) => state.isAuthenticated);

export const getAuth = createSelector([getIsAuth], s => s);