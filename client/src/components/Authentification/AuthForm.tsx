import * as React from 'react'
import {Button, Grid, Icon, Snackbar, TextField} from "@material-ui/core";
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
}


class AuthForm extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            prevPath:{pathname:''}
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
        //this.props.cookies.set('userID', this.state.username, { path: '/' });
        if (nextProps.token != this.props.token) {
            this.props.cookies.set('token', nextProps.token, {path: '/'});
            this.props.cookies.set('userid', nextProps.user, { path: '/' });
            if (this.state.prevPath.pathname.indexOf('profil') > -1){
                this.setState({prevPath : {  pathname: "/profil/" + nextProps.user}});
            }
        }
    }


    _handleSubmit = event => {
        this.props.authUser(this.state.username, this.state.password);
    };

    responseGoogle(response) {
        console.log(response);
    };


    render() {
        console.log(this.props.open);
        const { username, password } = this.state;
        const { _updateUsername, _updatePassword, _handleSubmit, props } = this;
        if (this.props.isAuthenticated)
            return <Redirect to={this.state.prevPath.pathname}/>
        return (
            <div>
                <GoogleLogin
                    clientId="782927614430-as1qgn7v6a07qm28r3aqk119rnj7je21.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
                <TextField  margin="normal" label="Email" defaultValue={username} onChange={(e) => _updateUsername(e)} fullWidth/>
                <TextField type="password" margin="normal" label="Mot de passe" defaultValue={password} onChange={(e) => _updatePassword(e)} fullWidth/>
                <Button onClick={_handleSubmit} >Connexion</Button>
                <Link to={"/signup"}><Icon >account_circle</Icon></Link>
                {this.props.variant && <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left',}} open={this.props.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <MySnackbarContentWrapper onClose={this.handleClose} variant={this.props.variant} message={this.props.message}/>
                </Snackbar>}
            </div>
        );
    }
}

export default withLastLocation(AuthForm);
