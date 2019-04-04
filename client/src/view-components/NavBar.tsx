import * as React from 'react';
import {Cookies} from 'react-cookie';
import {Link} from 'react-router-dom';
import {
    Toolbar,
    AppBar,
    Divider,
    Grid,
    Icon,
    Hidden,
    List,
    ListItem,
    ListItemText,
    Typography, Menu, MenuItem
} from '@material-ui/core';
import Search from "../containers/Search/Search";
import {Notification} from "../models/Notification";

interface Props {
    cookies : Cookies
    isAuthenticated: boolean
    notifications : Notification[]
}
interface State {
    isOpen: boolean,
    newNotfication : boolean,
    anchorEl: any,
}

const logo =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhbW8vOS9If-qdZ7-4SL30yXffg9sRyryDcil-2I8JoKSp36CKxw';

class NavBar extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            newNotfication : false,
            anchorEl: null
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if(nextProps.notifications !== this.props.notifications)
        {
            this.setState({newNotfication : true});
        }
    }


    render() {
        return (

            <AppBar position="sticky" color="default" className={"navbar"} elevation={0}>
                { this.props.isAuthenticated &&
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
                                {!this.state.newNotfication && <Icon aria-owns={this.state.anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick} >favorite_border_rounded</Icon> || <Icon aria-owns={this.state.anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick} style={{ color: 'red'}}>favorite_border_rounded</Icon>}
                                <Menu
                                    id="simple-menu"
                                    anchorEl={this.state.anchorEl}
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleClose}
                                >
                                    {this.props.notifications.map(function (notification) {
                                        return <Link key={notification.id} to={notification.url}><MenuItem>{notification.message}</MenuItem></Link>
                                    })}
                                </Menu>
                                <Link to={"/profil/" + this.props.cookies.get("userid")}><Icon>person_outlined</Icon></Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>}
            </AppBar>



        );
    }
}

export default (NavBar);
