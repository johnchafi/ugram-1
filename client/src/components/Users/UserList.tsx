import * as React from 'react'
import User from "../../models/User";
import {Grid} from "@material-ui/core";
import UserItem from "../../containers/Users/UserItem";
import {Card} from "@material-ui/core";

export interface Props {
    isAuthenticated: boolean
    users: User[],
    getUsers: (pageNumber : number, users: User[]) => any,
    pageNumber: number
}
interface State {
}


class UserList extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentWillMount(): void {
        this.props.getUsers(0, []);
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }
    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight  + 100;
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('app');
        if (this.isBottom(wrappedElement)) {
            this.props.getUsers(this.props.pageNumber, this.props.users);
            document.removeEventListener('scroll', this.trackScrolling);
        }
    };


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
