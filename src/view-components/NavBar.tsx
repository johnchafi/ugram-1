import * as React from 'react'
import {WithStyles, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
interface Props extends WithStyles<typeof styles> {
}
interface State {
    isOpen: boolean
}
import {Link} from 'react-router-dom';
import {Divider, Grid, Icon} from "@material-ui/core";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

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
        const {classes} = this.props;
        return (
            <Grid container>
                <Grid item xs={12} md={12} lg={12}>
                    <div style={{paddingBottom:20}}>
                        <AppBar position="sticky" color="default" elevation={0}>
                            <Toolbar>
                                <Grid container alignItems="center">
                                    <Grid item xs>
                                        <Grid container alignItems="center">
                                            <Link to={"/"}>UGRAM</Link>
                                            <Divider />
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container justify="flex-end">
                                            <Link to={"/users/"}><Icon >explore_outlined</Icon></Link>
                                            <Icon >favorite_border_rounded</Icon>
                                            <Link to={"/profil/team02"}><Icon>person_outlined</Icon></Link>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(NavBar);
