import * as React from 'react'
import User from "../../models/User";
import {Grid} from "@material-ui/core";
import UserItem from "../../containers/Users/UserItem";
import {Card} from "@material-ui/core";

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
            <Grid className={"listUsersContainer"} container spacing={8} direction="column" alignItems="center">
                <Card style={{width: 500, maxWidth:"100%"}}>
                    {users.map(function(user, i){
                        return <UserItem user={user} key={i}/>
                    })}
                </Card>
            </Grid>
        );
    }
}

export default UserList;
