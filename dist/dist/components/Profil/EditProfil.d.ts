import * as React from 'react';
import { Theme, WithStyles } from "@material-ui/core";
import User from "../../models/User";
declare const styles: (theme: Theme) => Record<"paper", import("@material-ui/core/styles/withStyles").CSSProperties>;
export interface Props extends WithStyles<typeof styles> {
    editUser: (User: any) => any;
    close: (User: any) => any;
    profil: User;
    open: boolean;
}
declare const _default: React.ComponentType<Pick<Props, "open" | "close" | "profil" | "editUser"> & import("@material-ui/core").StyledComponentProps<"paper">>;
export default _default;
