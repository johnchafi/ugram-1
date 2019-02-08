import { State } from '../../reducers';
export declare const getAuth: import("reselect").OutputSelector<State, boolean, (res: import("../../reducers/Authentifcation/auth").IStateAuthApp) => boolean>;
export declare const getAuthUser: import("reselect").OutputSelector<State, import("../../models/User").default, (res: import("../../reducers/Authentifcation/auth").IStateAuthApp) => import("../../models/User").default>;
