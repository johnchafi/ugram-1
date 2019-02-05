import * as React from 'react'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link} from 'react-router-dom';
import {red} from "@material-ui/core/colors";
import {Avatar, CardActions, withStyles} from "@material-ui/core";
import Picture from "../../models/Picture";
import User from "../../models/User";
export interface Props {
    picture : Picture,
    classes:PropTypes.object.isRequired
    user : User
}
interface State {
}


const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
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
    }

    renderAvatar()
    {
        if (this.props.user != null)
            return ( <Avatar aria-label="Recipe" src={this.props.user.pictureUrl}/>)
        else
            return ( <Avatar aria-label="Recipe" >{this.props.picture.userId.charAt(0)}</Avatar>)
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid item xs={3}>
                <Card className={classes.card}>
                    <CardHeader

                        avatar={
                           this.renderAvatar()
                        }
                        action={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={this.props.user && this.props.user.firstName + " " + this.props.user.lastName || "Moi"}
                        subheader={this.props.picture.mentions}
                    />
                    <CardMedia
                        className={classes.media}
                        image={this.props.picture.url|| "//"}
                        title="Paella dish"
                    />
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                    </CardActions>
                    <CardContent>
                        <Typography variant="overline">
                            {this.props.picture.description && this.props.picture.description + " / "}
                            {new Date(Number(this.props.picture.createdDate)).toDateString()}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

        );
    }
}
export default withStyles(styles)(PictureItem);
