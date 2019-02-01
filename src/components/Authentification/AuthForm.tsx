import * as React from 'react'
import {Button} from "reactstrap";
import {FormEvent} from "react";
import User from "../../models/User";
interface Props {
    isAuthenticated: boolean,
    user: User
    handleSubmit: (username: string, password: string) => void
}
interface State {
    username: string
    password: string
}


class AuthForm extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._updateUsername = this._updateUsername.bind(this);
        this._updatePassword = this._updatePassword.bind(this);
        this.state = {
            username: '',
            password: ''
        };
    }

    _updateUsername(username: string) {
        this.setState({ username: username });
    }
    _updatePassword(password: string) {
        this.setState({ password: password });
    }


    _handleSubmit(e: FormEvent<any>) {
        e.preventDefault();
        this.props.handleSubmit(this.state.username, this.state.password);
        this.setState({ username: '' });
        this.setState({ password: '' })
    }
    render() {
        const { username, password } = this.state;
        const { _updateUsername, _updatePassword, _handleSubmit, props } = this;
        return (
            <div>
                <form onSubmit={_handleSubmit}>
                    <input type="text" value={username} onChange={e => _updateUsername(e.target.value)} />
                    <input type="password" value={password} onChange={e => _updatePassword(e.target.value)} />
                    <Button type="submit">Connexion</Button>
                </form>
            </div>
        );
    }
}

export default AuthForm;
