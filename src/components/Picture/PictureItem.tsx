import * as React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Link} from 'react-router-dom';
import {
    Avatar,
    CardActions, CircularProgress, createStyles, Icon, LinearProgress,
    Popover, Theme, WithStyles,
    withStyles
} from "@material-ui/core";
import Picture from "../../models/Picture";
import User from "../../models/User";
import UpdatePictureItem from "../../containers/Picture/EditPictureItem";
import EditPictureItem from "../../containers/Picture/EditPictureItem";

export interface Props extends WithStyles<typeof styles>{
    picture : Picture,
    user : User
    isHome:boolean
}
interface State {
    anchorEl: HTMLElement
    open: boolean
}


const styles = () => createStyles({
    actions: {
        display: 'flex',
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
            <Grid item>
                <Card className="card">
                    <CardHeader avatar={this.renderAvatar()}
                        action={ !this.props.isHome &&
                            <EditPictureItem picture={this.props.picture}/>
                        }
                        title={this.props.user && this.props.user.firstName + " " + this.props.user.lastName || <LinearProgress />}
                        subheader={new Date(Number(this.props.picture.createdDate)).toDateString()}
                    />
                    <img className="media-card" src={this.props.picture.url|| "//"} alt={this.props.picture.description}/>
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
                {!this.props.isHome && <UpdatePictureItem open={this.state.open} picture={this.props.picture}/>}
            </Grid>

        );
    }
}
export default withStyles(styles)(PictureItem);
