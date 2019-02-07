import * as React from 'react'
import User from "../../models/User";
import Picture from "../../models/Picture";

import {
    Avatar,
    Button, Card, CardContent, createStyles,
    Grid,
    Icon,
    IconButton,
    Snackbar,
    Tabs,
    Theme,
    Typography, WithStyles, withTheme
} from "@material-ui/core";
import MySnackbarContentWrapper from "../../view-components/MySnackBarContentWrapper";
import PictureList from "../../containers/Picture/PictureList";
import {Tab} from "@material-ui/core";
import {withStyles} from "@material-ui/core/es";
import EditProfil from "../../containers/Profil/EditProfil";

const styles = theme => createStyles({
    root: {
        flexGrow: 1,
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
});


export interface Props extends WithStyles<typeof styles>{
    isAuthenticated: boolean
    getProfil: (string) => any
    getPicture: (string) => any
    user : User
    status: number,
    match: {params : {id: string}}
    location:{pathname:string}
    pictures: Picture[],
    message:string,
    classes: any
    theme: any
}
interface State {
    open:boolean
    isEditingProfil: boolean,
    value: number
}



class Profil extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        console.log(this.props.match.params.id);
        this.props.getProfil(this.props.match.params.id);
        this.props.getPicture(this.props.match.params.id);
        this.state = {
            open: false,
            isEditingProfil: false,
            value:0
        };
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.props.getProfil(nextProps.match.params.id);
            this.props.getPicture(nextProps.match.params.id);
        }
        this.setState({isEditingProfil:false});
        if (nextProps.status != 200) {
            this.setState({open: true});
            this.props.getProfil(nextProps.match.params.id);
        }
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

    handleChangeIndex = (index) : void => {
        this.setState({ value: index });
    };

    handleEditingProfil = () : void => {
        this.setState({isEditingProfil: true})
    };

    render(): React.ReactNode {
        const {classes, theme} = this.props;
        return (
            <React.Fragment>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={3} md={1} lg={1}>
                        <Avatar className={classes.bigAvatar} src={this.props.user && this.props.user.pictureUrl}/>
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
                            <b>{this.props.pictures && this.props.pictures.length}</b> posts
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
                <Grid container direction="row" justify="center" alignItems="center" spacing={24}>
                    <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left',}} open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                        <MySnackbarContentWrapper onClose={this.handleClose} variant="error" message={this.props.message}/>
                    </Snackbar>
                    <PictureList isHome={false}/>
                </Grid>
                {this.props.user && <EditProfil open={this.state.isEditingProfil}/>}
            </React.Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Profil);
