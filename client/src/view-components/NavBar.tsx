import * as React from 'react'
import {TextField, Toolbar, AppBar, Divider, Grid, Icon, Hidden} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Search from "../containers/Search/Search";

interface Props {
}
interface State {
    isOpen: boolean
}


const logo =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhbW8vOS9If-qdZ7-4SL30yXffg9sRyryDcil-2I8JoKSp36CKxw';

class NavBar extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    render() {
        return (
            <AppBar position="sticky" color="default" className={"navbar"} elevation={0}>
                <Toolbar>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Grid container alignItems="center">
                                <Link to={"/"} className={"left"}>
                                    <Hidden xsDown>
                                        <img alt="logo" src={logo}  />
                                        <Divider className={"divider"} />
                                    </Hidden>
                                    <img alt="label" className="logo" src="https://s3.ca-central-1.amazonaws.com/ugram-team02/assets/header-picture.png" />
                                </Link>
                            </Grid>
                        </Grid>
                        <Hidden xsDown>
                            <Search />
                        </Hidden>
                        <Grid item className={"header-nav"}>
                            <Grid container justify="flex-end">
                                <Link to={"/users/"}><Icon >explore_outlined</Icon></Link>
                                <Icon >favorite_border_rounded</Icon>
                                <Link to={"/profil/team02"}><Icon>person_outlined</Icon></Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>



        );
    }
}

export default (NavBar);
