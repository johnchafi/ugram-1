import * as React from 'react'

import {Avatar, Button, Grid, Icon, Snackbar, Tabs, Typography} from "@material-ui/core";
import MySnackbarContentWrapper from "../../view-components/MySnackBarContentWrapper";
import PictureList from "../../containers/Picture/PictureList";
import {Tab} from "@material-ui/core";
import EditProfil from "../../containers/Profil/EditProfil";
import Props from "../../Props/Profil";
import Upload from "../../containers/Picture/Upload";

interface State {
    open:boolean
    isEditingProfil: boolean,
    value: number
}



class Profil extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        console.log(this.props.match.params.id);
        this.state = {
            open: false,
            isEditingProfil: false,
            value:0
        };
    }

    componentWillMount(): void {
        this.props.getProfil(this.props.match.params.id);
        this.props.getPicture(this.props.match.params.id, 0, []);
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    componentWillUnmount() {
        this.props.reset();
        document.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('profil');
        if (this.isBottom(wrappedElement)) {
            this.props.getPicture(this.props.match.params.id, this.props.pageNumber, this.props.pictures);
            document.removeEventListener('scroll', this.trackScrolling);
        }
    };

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.props.getProfil(nextProps.match.params.id);
            this.props.getPicture(nextProps.match.params.id, this.props.pageNumber, this.props.pictures);
        }
        this.setState({isEditingProfil:false});
        if (nextProps.status != 200) {
            this.setState({open: true});
            this.props.getProfil(nextProps.match.params.id);
        }
        document.addEventListener('scroll', this.trackScrolling);
    }
    handleClose = (event, reason) : void => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };

    handleChange = (event, value) : void => {
        this.setState({ value });
    };
    handleEditingProfil = () : void => {
        this.setState({isEditingProfil: true})
    };

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={3} md={1} lg={1}>
                        <Avatar className="avatar" src={this.props.user && this.props.user.pictureUrl}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container direction="row">
                            <Grid item xs={12} md={6} lg={6}>
                                <Typography component="h1" variant="h4">
                                    {this.props.user && this.props.user.id}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                                <Button onClick={this.handleEditingProfil} variant="outlined">
                                    Edit Profile
                                </Button>
                            </Grid>
                        </Grid>
                        <Typography variant="subtitle1">
                            <b>{this.props.totalEntries}</b> posts
                        </Typography>
                        <Typography variant="subtitle2">
                            {this.props.user && this.props.user.firstName + " " + this.props.user.lastName}
                        </Typography>
                        <Typography variant="overline">Date registration : {this.props.user && new Date(Number(this.props.user.registrationDate)).toDateString()}</Typography>
                        <Typography variant="overline">Email : {this.props.user && this.props.user.email}</Typography>
                    </Grid>
                </Grid>
                <Tabs value={this.state.value} centered onChange={this.handleChange}>
                    <Tab label="Posts" icon={<Icon>grid_on_outlined</Icon>} />
                    <Tab label="IGTV" icon={<Icon>live_tv</Icon>} />
                    <Tab label="Saved" icon={<Icon>bookmark_border_outlined</Icon>} />
                    <Tab label="Tagged" />
                </Tabs>
                <Grid container direction="row" justify="center">
                    <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left',}} open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                        <MySnackbarContentWrapper onClose={this.handleClose} variant="error" message={this.props.message}/>
                    </Snackbar>
                    <Grid   container
                            direction="row"
                            justify="center"
                            alignItems="baseline" id="profil" >
                        <Grid item xs={8} md={6} lg={6}>
                            <Grid container direction="row" spacing={8}>
                                <PictureList isHome={false}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {this.props.user && <EditProfil open={this.state.isEditingProfil}/>}
                <Upload />

            </React.Fragment>
        );
    }
}

export default (Profil);
