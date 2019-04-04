import { createSelector } from "reselect";
import {State} from "../../../reducers";

const getPicturesComment = ((state: State) => state.comment);

export const getPictureComments = createSelector([getPicturesComment], s => s.comments);
