import { State } from "../../reducers";
export declare const getUsers: import("reselect").OutputSelector<State, import("../../components/Users/UserList").default[], (res: import("../../reducers/Users/UserList").IStateUsersApp) => import("../../components/Users/UserList").default[]>;
export declare const getIsAuthenticated: import("reselect").OutputSelector<State, boolean, (res: import("../../reducers/Users/UserList").IStateUsersApp) => boolean>;
