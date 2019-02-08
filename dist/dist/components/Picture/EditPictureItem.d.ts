import * as React from 'react';
import Picture from "../../models/Picture";
import { Theme, WithStyles } from "@material-ui/core";
declare const styles: (theme: Theme) => Record<"paper", import("@material-ui/core/styles/withStyles").CSSProperties>;
export interface Props extends WithStyles<typeof styles> {
    editPicture: (Picture: any) => any;
    picture: Picture;
    open: boolean;
}
declare const _default: React.ComponentType<Pick<Props, "picture" | "open" | "editPicture"> & import("@material-ui/core").StyledComponentProps<"paper">>;
export default _default;
