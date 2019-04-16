import * as React from 'react'
import User from "../../models/User";
import {Grid, Typography} from "@material-ui/core";
import UserItem from "../../containers/Explore/UserItem";
import PopularTag from "../../models/PopularTag";
import TagItem from "./TagItem";
import * as ReactGA from "react-ga";

export interface Props {
    isAuthenticated: boolean
    users: User[],
    tags: PopularTag[],
    getUsers: (pageNumber : number, users: User[]) => any,
    getTags: () => any,
    pageNumber: number
}
interface State {
}

class Explore extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentWillMount(): void {
        ReactGA.pageview(window.location.pathname);
        this.props.getUsers(0, []);
        this.props.getTags();
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    }

    render() {
        return (
            <Grid className={"containerExplore"} container direction="row" alignItems="center">
                <Grid container direction="row" alignItems="center">
                    <Grid container direction="row" justify="flex-start">
                        <Typography>Contacts à découvrir</Typography>
                    </Grid>
                    <div className={"containerUserList"}>
                        {this.props.users.map(function(user, i){
                            return <UserItem user={user} key={i}/>;
                        })}
                    </div>
                </Grid>

                <Grid container direction="row" alignItems="center">
                    <Grid container direction="row" justify="flex-start">
                        <Typography>Tags les plus populaires</Typography>
                    </Grid>
                    <div className={"containerUserList"}>
                        {this.props.tags.map(function(tag, i){
                            return <TagItem tag={tag} key={i}/>;
                        })}
                    </div>
                </Grid>

            </Grid>
        );
    }
}

export default Explore;
