import { createSelector } from "reselect";
import {State} from "../../reducers";

const getTagsData = ((state: State) => state.tags);

export const getPictures = createSelector([getTagsData], s => s.pictures);
export const getTagName = createSelector([getTagsData], s => s.tag);
