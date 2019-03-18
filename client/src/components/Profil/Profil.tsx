import * as React from 'react'

import {Avatar, Grid, Icon, Snackbar, Tabs, Typography} from "@material-ui/core";
import MySnackbarContentWrapper from "../../view-components/MySnackBarContentWrapper";
import PictureList from "../../containers/Picture/PictureList";
import {Tab} from "@material-ui/core";
import EditProfil from "../../containers/Profil/EditProfil";
import Props from "../../Props/Profil";
import Upload from "../../containers/Picture/Upload";
import {Link} from 'react-router-dom';


interface State {
    isEditingProfil: boolean,
    slideIndex: number
    open: boolean
}

class Profil extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
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
        this.props.closeMessage();
    }

    isBottomProfil(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight + 100;
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('app');
        if (this.isBottomProfil(wrappedElement)) {
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

    getPrettyDate() : string {
        let date : Date = new Date(Number(this.props.user.registrationDate));

        let monthNames : string[] = [
            "Janvier", "Fevrier", "Mars",
            "Avril", "Mai", "Juin", "Juillet",
            "Aout", "Septembre", "Octobre",
            "Novembre", "Decembre"
        ];

        return date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
    }
    render(): React.ReactNode {
        if (!this.props.user)
            return ( <React.Fragment>
                <Grid container direction="row" justify="center" alignItems="center" className={"ProfilNotFound"}>
                    <div>
                    <p>Cette page n’est malheureusement pas disponible.</p>
                    <p>Le lien que vous avez suivi est peut-être rompu, ou la page a été supprimée. <Link to={"/"}>Revenir à Instagram</Link>.</p>
                    </div>
                </Grid>
            </React.Fragment>);
        return (
            <React.Fragment>
                <div style={{maxWidth:935 , margin:"auto"}}>
                    <Grid container direction="row" justify="center" alignItems="center" className="ProfilHeader">
                        <Grid item xs={4}>
                            <Avatar style={{ margin: 'auto' }} className="avatar" src={this.props.user && this.props.user.pictureUrl}/>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container alignItems="center">
                                <Typography component="h1" variant="h4">
                                    {this.props.user && this.props.user.id}
                                </Typography>
                                {this.props.cookies.get("userid") === this.props.user.id && <EditProfil cookies={this.props.cookies}/>}
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
                            <Typography className={"el"} variant="overline">Inscrit depuis le {this.props.user && this.getPrettyDate()}</Typography>
                            <Typography className={"el"} variant="overline">Email : {this.props.user && this.props.user.email}</Typography>
                        </Grid>
                    </Grid>

                    <Tabs className={"tabsContainer"} value={this.state.slideIndex} centered onChange={this.handleChangeTabs}>
                        <Tab label="Publications" icon={<Icon className="tab-profil">grid_on_outlined</Icon>} />
                        <Tab label="Téleverser" icon={<Icon className="tab-profil">cloud_upload</Icon>} />
                        {this.props.cookies.get("userid") === this.props.user.id &&  <Tab label="Enregistrer" icon={<Icon className="tab-profil">save</Icon>} />}
                        <Tab label="Identifications" icon={<Icon className="tab-profil">bookmark_border_outlined</Icon>} />
                    </Tabs>
                    {this.state.slideIndex === 0 &&
                    <Grid container>
                        <PictureList isHome={false} isMe={this.props.cookies.get("userid") === this.props.user.id}/>
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
                    {this.props.variant && <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left',}} open={this.props.open} autoHideDuration={6000} onClose={this.handleClose}>
                        <MySnackbarContentWrapper onClose={this.handleClose} variant={this.props.variant} message={this.props.message}/>
                    </Snackbar>}
                </div>
            </React.Fragment>
        );
    }
}

export default (Profil);
