import { createSelector } from 'reselect'
import {State} from "../../reducers";

const getUserProfilData = ((state: State) => state.profil);

export const getUserProfil = createSelector([getUserProfilData], s => s.user);
export const getStatusProfil = createSelector([getUserProfilData], s => s.status);
export const getMessageError = createSelector([getUserProfilData], s => s.message);
