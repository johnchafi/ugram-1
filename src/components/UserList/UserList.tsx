import * as React from 'react'
import User from "../../models/User";
import UserItem from "../UserItem/UserItem";
import {Col, Row} from "reactstrap";
export interface Props {
    isAuthenticated: boolean
    users: User[],
    getUsers: () => any
}
interface State {
}


class UserList extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.props.getUsers();
        this.state = {
            username: '',
            password: ''
        };
    }

    render() {
        const{users} = this.props;
        return (
            <div>
                <Row>
                    {users.map(function(user, i){
                        return <UserItem user={user} key={i}/>
                    })}
                </Row>
            </div>
        );
    }
}

export default UserList;
