import { State } from '../../reducers'
import { createSelector } from 'reselect'

const getIsAuth = ((state: State) => state.auth);

export const getAuth = createSelector([getIsAuth], s => s.isAuthenticated);