import { createSelector } from "reselect";
import {State} from "../../reducers";

const getPicturesSearch = ((state: State) => state.search);
export const getPicturesDescription = createSelector([getPicturesSearch], s => s.picturesDescription);
export const getPicturesTags = createSelector([getPicturesSearch], s => s.picturesTags);
export const getUsers = createSelector([getPicturesSearch], s => s.users);
