import * as React from 'react';
import { Theme, WithStyles } from "@material-ui/core";
import Picture from "../../models/Picture";
import '../../../scss/app.scss';
import User from "../../models/User";
export interface Props extends WithStyles<typeof styles> {
    picture: Picture;
    user: User;
    isHome: boolean;
    deletePicture: (string: any, number: any) => any;
}
declare const styles: (theme: Theme) => Record<"media" | "actions" | "expandOpen" | "typography" | "cardHeader", import("@material-ui/core/styles/withStyles").CSSProperties>;
declare const _default: React.ComponentType<Pick<Props, "picture" | "user" | "isHome" | "deletePicture"> & import("@material-ui/core").StyledComponentProps<"media" | "actions" | "expandOpen" | "typography" | "cardHeader">>;
export default _default;
