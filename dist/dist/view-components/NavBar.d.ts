import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles';
interface Props extends WithStyles<typeof styles> {
}
declare const styles: {
    root: {
        flexGrow: number;
    };
    grow: {
        flexGrow: number;
    };
    menuButton: {
        marginLeft: number;
        marginRight: number;
    };
};
declare const _default: React.ComponentType<Pick<Props, never> & import("@material-ui/core").StyledComponentProps<"root" | "grow" | "menuButton">>;
export default _default;
