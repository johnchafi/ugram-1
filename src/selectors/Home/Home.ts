import { createSelector } from 'reselect'
import {State} from "../../reducers";

const getPicturesUser = ((state: State) => state.home);

export const getPictures = createSelector([getPicturesUser], s => s.pictures);
export const getStateHome = createSelector([getPicturesUser], s => s.finish);
