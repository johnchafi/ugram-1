import * as React from 'react'
import User from "../../models/User";
import {Button, TextField} from "@material-ui/core";
import { GoogleLogin } from 'react-google-login';

interface Props {
    isAuthenticated: boolean,
    user: User
    authUser: (username: string, password: string) => any
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
    }
    _updatePassword = (event) =>  {
        this.setState({ password: event.target.value });
    }


    _handleSubmit = event => {
        console.log(this.props);
        this.props.authUser(this.state.username, this.state.password);
    }
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
