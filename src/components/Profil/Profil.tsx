import * as React from 'react'
import User from "../../models/User";
import Picture from "../../models/Picture";

import {Grid, Snackbar} from "@material-ui/core";
import MySnackbarContentWrapper from "../../view-components/MySnackBarContentWrapper";
import PictureList from "../../containers/Picture/PictureList";
export interface Props {
    isAuthenticated: boolean
    getProfil: (string) => any
    getPicture: (string) => any
    user : User
    status: number,
    match: {params : {id: string}}
    location:{pathname:string}
    pictures: Picture[],
    message:string,
}
interface State {
    open:boolean
}


class Profil extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        console.log(this.props.match.params.id);
        this.props.getProfil(this.props.match.params.id);
        this.props.getPicture(this.props.match.params.id);
        this.state = {
            open: false
        };
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.props.getProfil(nextProps.match.params.id);
            this.props.getPicture(nextProps.match.params.id);
        }
        if (nextProps.status != 200) {
            this.setState({open: true});
            this.props.getProfil(nextProps.match.params.id);
        }
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };

    render(): React.ReactNode {
        return (
            <Grid
                container
                spacing={24}
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                >
                    <MySnackbarContentWrapper
                        onClose={this.handleClose}
                        variant="error"
                        message={this.props.message}
                    />
                </Snackbar>
                <PictureList isHome={false}/>
            </Grid>
        );
    }
}

export default Profil;
