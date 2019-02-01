import * as React from 'react'
import {Button} from "reactstrap";
import {FormEvent} from "react";
import User from "../../models/User";
interface Props {
    isAuthenticated: boolean
    getProfil: () => any
    user : User
    status: number
}
interface State {
}


class Profil extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.props.getProfil();
        this.state = {
            username: '',
            password: ''
        };
    }

    render() {
        const {user, status} = this.props;
        return (
            <div>
                {JSON.stringify(status)}
            </div>
        );
    }
}

export default Profil;