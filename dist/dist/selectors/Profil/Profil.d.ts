import { State } from "../../reducers";
export declare const getUserProfil: import("reselect").OutputSelector<State, import("../../models/User").default, (res: import("../../reducers/Profil/Profil").IStateProfilApp) => import("../../models/User").default>;
export declare const getStatusProfil: import("reselect").OutputSelector<State, number, (res: import("../../reducers/Profil/Profil").IStateProfilApp) => number>;
export declare const getMessageError: import("reselect").OutputSelector<State, string, (res: import("../../reducers/Profil/Profil").IStateProfilApp) => string>;
