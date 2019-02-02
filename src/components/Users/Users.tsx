import * as React from 'react'
import User from "../../models/User";
export interface Props {
    isAuthenticated: boolean
    users: Users[],
    getUsers: () => any
}
interface State {
}


class Users extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.props.getUsers();
        this.state = {
            username: '',
            password: ''
        };
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.props.users)}
            </div>
        );
    }
}

export default Users;
