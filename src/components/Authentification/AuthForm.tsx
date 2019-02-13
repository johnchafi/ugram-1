import * as React from 'react'
import {FormEvent} from "react";
import User from "../../models/User";
import {Button, Input} from "@material-ui/core";

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
        this.state = {
            username: '',
            password: ''
        };
    }

    _updateUsername(event) {
        this.setState({ username: event.target.value });
    }
    _updatePassword(event) {
        this.setState({ password: event.target.value  });
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
                <form onSubmit={e => _handleSubmit(e)}>
                    <Input type="text" value={username} onChange={e => _updateUsername(e)} />
                    <Input type="password" value={password} onChange={e => _updatePassword(e)} />
                    <Button type="submit">Connexion</Button>
                </form>
            </div>
        );
    }
}

export default AuthForm;
