import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles';
declare const styles: (theme: any) => {
    success: {
        backgroundColor: string;
    };
    error: {
        backgroundColor: any;
    };
    info: {
        backgroundColor: any;
    };
    warning: {
        backgroundColor: string;
    };
    icon: {
        fontSize: number;
    };
    iconVariant: {
        opacity: number;
        marginRight: any;
    };
    message: {
        display: string;
        alignItems: string;
    };
};
interface Props extends WithStyles<typeof styles> {
    message: any;
    onClose: any;
    variant: string;
}
declare const _default: React.ComponentType<Pick<Props, "message" | "variant" | "onClose"> & import("@material-ui/core/styles").StyledComponentProps<"icon" | "message" | "error" | "success" | "info" | "warning" | "iconVariant">>;
export default _default;
