import * as React from 'react'

import {Avatar, Button, Grid, Icon, Snackbar, Tabs, Typography} from "@material-ui/core";
import MySnackbarContentWrapper from "../../view-components/MySnackBarContentWrapper";
import PictureList from "../../containers/Picture/PictureList";
import {Tab} from "@material-ui/core";
import EditProfil from "../../containers/Profil/EditProfil";
import Props from "../../Props/Profil";
import Upload from "../../containers/Picture/Upload";

interface State {
    isEditingProfil: boolean,
    slideIndex: number
    open: boolean
}

class Profil extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        console.log(this.props.match.params.id);
        this.state = {
            isEditingProfil: false,
            slideIndex:0,
            open: this.props.open
        };
    }

    componentWillMount(): void {
        this.props.getProfil(this.props.match.params.id);
        this.props.getPicture(this.props.match.params.id, 0, []);
    }

    componentWillUnmount() {
        this.props.reset();
        document.removeEventListener('scroll', this.trackScrolling);
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('app');
        if (this.isBottom(wrappedElement)) {
            console.log('header bottom reached');
            this.props.getPicture(this.props.match.params.id, this.props.pageNumber, this.props.pictures);
            document.removeEventListener('scroll', this.trackScrolling);
        }
    };

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.props.closeMessage();
            this.props.getProfil(nextProps.match.params.id);
            this.props.getPicture(nextProps.match.params.id, 0, []);
        }
        this.setState({isEditingProfil:false});
        document.addEventListener('scroll', this.trackScrolling);
    }
    handleClose = (event, reason) : void => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.closeMessage();
    };

    handleChangeTabs = (event, value) : void => {
        this.setState({
            slideIndex: value,
        });
    };

    getPrettyDate() {
        let date = 


        return new Date(Number(this.props.user.registrationDate)).toDateString();
    }
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <div style={{maxWidth:935 , margin:"auto"}}>
                    <Grid container direction="row" justify="center" alignItems="center" className={"ProfilHeader"}>
                        <Grid item xs={4}>
                            <Avatar style={{ margin: 'auto' }} className="avatar" src={this.props.user && this.props.user.pictureUrl}/>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container alignItems="center">
                                <Typography component="h1" variant="h4">
                                    {this.props.user && this.props.user.id}
                                </Typography>
                                <EditProfil/>
                            </Grid>
                            <div style={{margin:20}}>
                                <Grid container spacing={40}>
                                    <Typography variant="subtitle1">
                                        <b>{this.props.totalEntries}</b> posts
                                    </Typography>
                                </Grid>
                            </div>
                            <Typography variant="subtitle2">
                                {this.props.user && this.props.user.firstName + " " + this.props.user.lastName}
                            </Typography>
                            <Typography className={"el"} variant="overline">Inscrit depuis : {this.props.user && this.getPrettyDate()}</Typography>
                            <Typography className={"el"} variant="overline">Email : {this.props.user && this.props.user.email}</Typography>
                        </Grid>
                    </Grid>

                    <Tabs value={this.state.slideIndex} centered onChange={this.handleChangeTabs}>
                        <Tab label="Posts" icon={<Icon>grid_on_outlined</Icon>} />
                        <Tab label="Upload" icon={<Icon>cloud_upload</Icon>} />
                        <Tab label="Saved" icon={<Icon>save</Icon>} />
                        <Tab label="Tagged" icon={<Icon>bookmark_border_outlined</Icon>} />
                    </Tabs>
                    {this.state.slideIndex === 0 &&
                    <Grid container spacing={8} >
                        <PictureList isHome={false}/>
                    </Grid>}
                    {this.state.slideIndex === 1 &&
                    <Grid container direction="row" justify="center">
                        <Upload />
                    </Grid>}
                    {this.state.slideIndex === 2 &&
                    <Grid container direction="row" justify="center">
                        SAVED
                    </Grid>}
                    {this.state.slideIndex === 3 &&
                    <Grid container direction="row" justify="center">
                        TAGGED
                    </Grid>}
                    <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left',}} open={this.props.open} autoHideDuration={6000} onClose={this.handleClose}>
                        <MySnackbarContentWrapper onClose={this.handleClose} variant={this.props.variant} message={this.props.message}/>
                    </Snackbar>
                </div>
            </React.Fragment>
        );
    }
}

export default (Profil);
