import { createSelector } from "reselect";
import {State} from "../../reducers";

const getUserProfilData = ((state: State) => state.profil);

const getStatusApp = ((state: State) => state.status);

export const getUserProfil = createSelector([getUserProfilData], s => s.user);
export const getStatusProfil = createSelector([getStatusApp], s => s.status);
export const getVariantString = createSelector([getStatusApp], s => s.variant);
export const getStateofStatus = createSelector([getStatusApp], s => s.open);
export const getMessageError = createSelector([getStatusApp], s => s.message);
