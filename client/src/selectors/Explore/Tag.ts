import { createSelector } from "reselect";
import {State} from "../../reducers";

const getUserProfilData = ((state: State) => state.profil);

const getStatusApp = ((state: State) => state.status);


export const getPictures = createSelector([getUserProfilData], s => s.pictures);
