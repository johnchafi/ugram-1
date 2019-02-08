import * as React from 'react';
import User from "../../models/User";
import Picture from "../../models/Picture";
import { WithStyles } from "@material-ui/core";
declare const styles: (theme: any) => Record<"root" | "bigAvatar", import("@material-ui/core/styles/withStyles").CSSProperties>;
export interface Props extends WithStyles<typeof styles> {
    isAuthenticated: boolean;
    getProfil: (userId: string) => any;
    getPicture: (userId: string, pageNumber: number, pictures: Picture[]) => any;
    reset: () => any;
    user: User;
    status: number;
    pageNumber: number;
    match: {
        params: {
            id: string;
        };
    };
    location: {
        pathname: string;
    };
    pictures: Picture[];
    message: string;
    classes: any;
    theme: any;
}
declare const _default: React.ComponentType<Pick<Props, "reset" | "isAuthenticated" | "getProfil" | "getPicture" | "user" | "status" | "pageNumber" | "match" | "location" | "pictures" | "message"> & import("@material-ui/core/es").StyledComponentProps<"root" | "bigAvatar">>;
export default _default;
