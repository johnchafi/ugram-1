import { State } from "../../reducers";
export declare const getPictures: import("reselect").OutputSelector<State, import("../../models/Picture").default[], (res: import("../../reducers/Picture/Picture").IStatePictureApp) => import("../../models/Picture").default[]>;
export declare const getStateHome: import("reselect").OutputSelector<State, boolean, (res: import("../../reducers/Picture/Picture").IStatePictureApp) => boolean>;
export declare const getPageNumber: import("reselect").OutputSelector<State, number, (res: import("../../reducers/Picture/Picture").IStatePictureApp) => number>;
