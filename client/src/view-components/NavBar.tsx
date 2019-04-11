import * as React from 'react';
import {Cookies} from 'react-cookie';
import {Link} from 'react-router-dom';
import {
    Toolbar,
    AppBar,
    Divider,
    Grid,
    Icon,
    Hidden, Menu, MenuItem, Badge
} from '@material-ui/core';
import Search from "../containers/Search/Search";
import {Notification} from "../models/Notification";

interface Props {
    cookies : Cookies
    isAuthenticated: boolean
    notifications : Notification[],
    setNotificationRead :(userId : string, id : number) => any
}
interface State {
    isOpen: boolean,
    numberNotifications : number,
    new : boolean
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
            numberNotifications : 0,
            new : true,
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
        this.setState({numberNotifications : 0});
        this.setState({new : true});
        this.props.notifications.map(function (notification: Notification) {
            if (!notification.isRead)
                this.props.setNotificationRead(notification.userId, notification.id);

        }.bind(this));
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    componentWillMount(): void {
        let i = 0;
        this.props.notifications.map(function (notification : Notification) {
            if (!notification.isRead) {
                this.setState({new : false});
                i++;
            }
        }.bind(this, i));
        this.setState({numberNotifications: i});
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if(nextProps.notifications !== this.props.notifications)
        {
            let i = 0;
            nextProps.notifications.map(function (notification : Notification) {
                console.log(notification);
                if (!notification.isRead) {
                    i++;
                }
            }.bind(i));
            if (i !== 0)
                this.setState({new : false});
            this.setState({numberNotifications: i});
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
                                <Badge badgeContent={this.state.numberNotifications} color="secondary" className={'badge'} invisible={this.state.new}>
                                    <Icon style={{cursor: "pointer"}} aria-owns={this.state.anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick} >favorite_border_rounded</Icon>
                                </Badge>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={this.state.anchorEl}
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleClose}
                                    style={{top : 40}}
                                >
                                    {this.props.notifications.map(function (notification) {
                                        return (
                                            <Link key={notification.id} to={notification.url} style={{textDecoration: "none"}}>
                                                <MenuItem style={{height: 40, paddingTop: 5, paddingBottom: 5}}>
                                                    <div style={{width: 40, height : 40, right: 'right'}}>
                                                        <img style={{maxWidth: "100%", maxHeight : "100%",   borderRadius : "50%"}} src={notification.userPictureUrl}/>
                                                    </div>
                                                    <div style={{minWidth : 360, marginLeft : 10, marginRight: 10}}>{notification.message.split(' ').map(function (message : string, index : number) {
                                                        if (index === 0)
                                                            return <strong key={index}>{message}</strong>;
                                                        else
                                                            return " " + message;
                                                    })}</div>
                                                    <div style={{width: 40, height : 40}}>
                                                        <img style={{maxWidth: "100%", maxHeight : "100%"}} src={notification.pictureUrl}/>
                                                    </div>
                                                </MenuItem>
                                                <Divider style={{margin: "auto", width: "90%"}}/>
                                            </Link>)
                                    }.bind(this))}
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
