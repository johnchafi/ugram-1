import * as React from 'react'
import User from "../../models/User";
export interface Props {
    isAuthenticated: boolean
    getProfil: (string) => any
    user : User
    status: number,
    userid: string
}
interface State {
}


class Profil extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        console.log(this.props.userid);
        this.props.getProfil(this.props.userid);
        this.state = {
            username: '',
            password: ''
        };
    }

    render() {
        const {user, status} = this.props;
        return (
            <div>
                {JSON.stringify(user)}
            </div>
        );
    }
}

export default Profil;
