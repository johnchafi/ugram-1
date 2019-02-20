import { createSelector } from 'reselect'
import {State} from "../../reducers";

const getPicturesUser = ((state: State) => state.picture);

export const getPictures = createSelector([getPicturesUser], s => s.pictures);
export const getStateHome = createSelector([getPicturesUser], s => s.finish);
export const getNumberOfPost = createSelector([getPicturesUser], s => s.totalEntries);
export const getPageNumber = createSelector([getPicturesUser], s => s.pageNumber);

