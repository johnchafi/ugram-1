import * as React from 'react';
import User from "../../models/User";
import { WithStyles } from "@material-ui/core";
export interface Props extends WithStyles<typeof styles> {
    user: User;
}
declare const styles: (theme: any) => {
    card: {
        minWidth: number;
        maxWidth: number;
    };
    media: {
        height: number;
        paddingTop: string;
    };
    actions: {
        display: string;
    };
    expand: {
        transform: string;
        marginLeft: string;
        transition: any;
    };
    expandOpen: {
        transform: string;
    };
    avatar: {
        backgroundColor: string;
    };
};
declare const _default: React.ComponentType<Pick<Props, "user"> & import("@material-ui/core").StyledComponentProps<"media" | "card" | "actions" | "expand" | "expandOpen" | "avatar">>;
export default _default;
