import * as React from 'react'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link} from 'react-router-dom';
import {red} from "@material-ui/core/colors";
import {
    Avatar,
    Button,
    CardActions, CircularProgress, Icon, LinearProgress,
    Popover,
    withStyles
} from "@material-ui/core";
import Picture from "../../models/Picture";
import User from "../../models/User";
import UpdatePictureItem from "../../containers/Picture/EditPictureItem";
export interface Props {
    picture : Picture,
    classes:PropTypes.object.isRequired
    user : User
    isHome:boolean
    deletePicture : (string, number) => any
}
interface State {
    anchorEl: HTMLElement
    open: boolean
}


const styles = theme => ({
    card: {
        minWidth: 200,
        maxWidth: 500,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    typography: {
        margin: theme.spacing.unit * 2,
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});


class PictureItem extends React.Component<Props,State> {

    constructor(props : Props)
    {
        super(props);
        this.state = {
            anchorEl:null,
            open:false,
        }
    }

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };
    handleSuppress = event => {
        this.props.deletePicture(this.props.picture.userId, this.props.picture.id);
        this.setState({
            anchorEl: null,
        });
    };

    handleEdit = event => {
        this.setState({
            open: !this.state.open,
        });
    };



    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };


    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        this.setState({open: false});
    }

    renderAvatar()
    {
        if (this.props.user != null && this.props.user.pictureUrl)
            return ( <Avatar aria-label="Recipe" src={this.props.user.pictureUrl}/>);
        else if (this.props.user != null && this.props.user.id)
            return ( <Avatar aria-label="Recipe" >{this.props.user.firstName.charAt(0)}</Avatar>);
        else
            return ( <Avatar aria-label="Recipe" ><CircularProgress disableShrink /></Avatar>)
    }

    render() {
        const {classes} = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <Grid item md={6} lg={4} xs={8}>
                <Card className={classes.card}>
                    <CardHeader avatar={this.renderAvatar()}
                        action={ !this.props.isHome &&
                        <IconButton aria-owns={open ? 'simple-popper' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleClick}>
                            <MoreVertIcon/>
                        </IconButton>
                        }
                        title={this.props.user && this.props.user.firstName + " " + this.props.user.lastName || <LinearProgress />}
                        subheader={new Date(Number(this.props.picture.createdDate)).toDateString()}
                    />
                    <CardMedia className={classes.media} image={this.props.picture.url|| "//"} title={this.props.picture.description}/>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <Typography variant="overline">
                            {this.props.picture.description && this.props.picture.description + this.props.picture.mentions.map(function (mention, i) {
                                return " " + mention;
                            }) + " // " + this.props.picture.tags.map(function (tag, i) {return "#" + tag;})}
                        </Typography>
                    </CardActions>
                </Card>
                <Popover id="simple-popper" open={open} anchorEl={anchorEl} onClose={this.handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center',}} transformOrigin={{vertical: 'top', horizontal: 'center',}}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid container direction="column" justify="center" alignItems="center">
                            <IconButton onClick={this.handleSuppress} color="secondary">
                                <Icon color="action">
                                    delete
                                </Icon>
                            </IconButton>
                            <IconButton onClick={this.handleEdit}color="primary">
                                <Icon color="action">
                                    update
                                </Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Popover>
                <UpdatePictureItem open={this.state.open} picture={this.props.picture}/>
            </Grid>

        );
    }
}
export default withStyles(styles)(PictureItem);