import * as React from 'react'
import User from "../../models/User";
import {Button, TextField} from "@material-ui/core";
import { Cookies } from 'react-cookie';

import { GoogleLogin } from 'react-google-login';

interface Props {
    isAuthenticated: boolean,
    user: User
    authUser: (username: string, password: string, token:string) => any,
    cookies : Cookies
}
interface State {
    username: string
    password: string
}


class AuthForm extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    _updateUsername = (event) => {
        this.setState({ username: event.target.value });
    };
    _updatePassword = (event) =>  {
        this.setState({ password: event.target.value });
    };


    _handleSubmit = event => {
        //TODO Handle errors
        //TODO Call API for getting token

        let token : string = 'a693d876-615f-4f17-949c-31ea4e13ff32';

        this.props.cookies.set('userID', this.state.username, { path: '/' });
        this.props.cookies.set('token', token, { path: '/' });

        this.props.authUser(this.state.username, this.state.password, token);
    };

    responseGoogle(response) {
        console.log(response);
    };


    render() {
        const { username, password } = this.state;
        const { _updateUsername, _updatePassword, _handleSubmit, props } = this;
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
            </div>
        );
    }
}

export default AuthForm;
