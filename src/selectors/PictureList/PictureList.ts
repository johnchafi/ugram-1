import { createSelector } from 'reselect'
import {State} from "../../reducers";

const getPicturesUser = ((state: State) => state.pictures);

export const getPictures = createSelector([getPicturesUser], s => s.pictures);
export const getIsAuthenticated = createSelector([getPicturesUser], s => s.isAuthenticated);
