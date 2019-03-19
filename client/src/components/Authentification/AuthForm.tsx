import * as React from 'react'
import {Button, Grid, Hidden, Snackbar, TextField} from "@material-ui/core";
import { Cookies } from 'react-cookie';
import { GoogleLogin } from 'react-google-login';
import {WithLastLocationProps} from 'react-router-last-location';
import {Link} from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';
import {Redirect, Route, RouteProps} from 'react-router';
import MySnackbarContentWrapper from "../../view-components/MySnackBarContentWrapper";
interface Props extends WithLastLocationProps{
    isAuthenticated: boolean,
    user: string
    authUser: (username: string, password: string) => any,
    authUserGoogle: (response:any) => any,
    cookies : Cookies
    token: string,
    closeMessage: () => any
    message:string
    open:boolean
    variant:string
    location: string
}
interface State {
    username: string
    password: string
    prevPath: any
    errorUsername: string
    errorPassword: string
}


class AuthForm extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            prevPath:{pathname:''},
            errorUsername: "",
            errorPassword: ""
        };
    }

    handleClose = (event, reason) : void => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.closeMessage();
    };

    componentWillMount(): void {
        if (this.props.lastLocation != null)
            this.setState({ prevPath: this.props.lastLocation});
    }

    _updateUsername = (event) => {
        this.setState({ username: event.target.value });
    };
    _updatePassword = (event) =>  {
        this.setState({ password: event.target.value });
    };

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.token != this.props.token) {
            this.props.cookies.set('token', nextProps.token, {path: '/'});
            this.props.cookies.set('userid', nextProps.user, { path: '/' });
            if (this.state.prevPath.pathname.indexOf('profil') > -1 && (this.state.prevPath.pathname.indexOf('undefined') > -1 || this.state.prevPath.pathname.indexOf(nextProps.user) === -1)){
                this.setState({prevPath : {  pathname: "/profil/" + nextProps.user}});
            }
            if (this.state.prevPath.pathname.indexOf('signup') > -1)
                this.setState({prevPath : {  pathname: "/"}});
        }
    }

    validate() : boolean {
        let error = true;

        if (this.state.username.length === 0) {
            this.setState({errorUsername: "Champ obligatoire"});
            error = false;
        }
        else {
            this.setState({errorUsername: null});
        }

        if (this.state.password.length === 0) {
            this.setState({errorPassword: "Champ obligatoire"});
            error = false;
        }
        else {
            this.setState({errorPassword: null});
        }
        return error;
    }


    _handleSubmit = event => {
        event.preventDefault();
        if (this.validate()) {
            this.props.authUser(this.state.username, this.state.password);
        }
    };

    responseGoogle = response => {
        this.props.authUserGoogle(response);
    };


    errorGoogle = response => {
    };


    render() {
        console.log(this.props.open);
        const { username, password } = this.state;
        const { _updateUsername, _updatePassword, _handleSubmit, props } = this;
        if (this.props.isAuthenticated)
            return <Redirect to={this.state.prevPath.pathname}/>
        return (
            <Grid container className="LoginPage" spacing={16} justify="center" alignItems="center">
                <Grid className={"left"} item xs={12} sm={6}>
                    <Hidden xsDown>
                        <img alt={""} src={"https://s3.ca-central-1.amazonaws.com/ugram-team02/assets/image_login.png?fbclid=IwAR2oSRUzEQmU1NhlLlx3ug7wHYeEQWJMsfZx5x1U0j8y0BTu_v8-vK-1FsQ"} />
                    </Hidden>
                </Grid>
                <Grid className={"right"} item xs={12} sm={6}>
                    <form className={"containerForm"} onSubmit={(e) => _handleSubmit(e)}>
                        <img className={"logo"} alt="label" src="https://s3.ca-central-1.amazonaws.com/ugram-team02/assets/header-picture.png" />
                        <Grid>
                            <TextField className={"input"} helperText={this.state.errorUsername} margin="normal" label="Email" defaultValue={username} onChange={(e) => _updateUsername(e)} fullWidth/>
                            <TextField className={"input"} helperText={this.state.errorPassword} type="password" margin="normal" label="Mot de passe" defaultValue={password} onChange={(e) => _updatePassword(e)} fullWidth/>
                            <Button type={"submit"}>Se connecter</Button>

                            <div className={"or"}>
                                <p>OU</p>
                            </div>

                            <GoogleLogin
                                clientId="782927614430-as1qgn7v6a07qm28r3aqk119rnj7je21.apps.googleusercontent.com"
                                buttonText="Se connecter avec Google"
                                onSuccess={this.responseGoogle}
                                onFailure={this.errorGoogle}
                            />

                        </Grid>
                    </form>

                    <div className={"register"}>
                        <p>Vous n’avez pas de compte  ? <Link to={"/signup"}>Inscrivez-vous</Link></p>
                    </div>

                </Grid>
                {this.props.variant && <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left',}} open={this.props.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <MySnackbarContentWrapper onClose={this.handleClose} variant={this.props.variant} message={this.props.message}/>
                </Snackbar>}
            </Grid>
        );
    }
}

export default withLastLocation(AuthForm);
