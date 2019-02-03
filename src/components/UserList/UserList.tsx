import * as React from 'react'
import User from "../../models/User";
import UserItem from "../UserItem/UserItem";
import {Grid} from "@material-ui/core";

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
                <Grid container spacing={24}>
                        {users.map(function(user, i){
                            return <UserItem user={user} key={i}/>
                        })}
                </Grid>
            </div>
        );
    }
}

export default UserList;
