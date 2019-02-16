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
    CardActions,
    CircularProgress,
    createStyles,
    LinearProgress,
    Theme,
    WithStyles,
    withStyles
} from "@material-ui/core";
import Picture from "../../models/Picture";
import User from "../../models/User";
import PictureItem from "../../containers/Picture/PictureItem";
import Dialog from "@material-ui/core/Dialog";
import Icon from "@material-ui/core/Icon";
export interface Props extends WithStyles<typeof styles>{
    picture : Picture,
    user : User
    isHome:boolean
    deletePicture : (string, number) => any
}
interface State {
    didLoad:boolean,
    open: boolean
}


const styles = (theme: Theme) => createStyles({
    media: {
        height: 0,
        minWidth: 500,
        maxWidth: 500,
        paddingTop: '100%', // 16:9
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
    cardHeader: {
        "text-overflow": "ellipsis"
    }
});

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}





class PictureItemHome extends React.Component<Props,State> {

    constructor(props : Props) {
        super(props);

        this.state = {
            didLoad:false,
            open:false
        }
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

    handleCloseEdit = event => {
        this.setState({open: false});
    };


    onLoad = () => {
        this.setState({
            didLoad: true
        })
    };

    handleOpenEdit = event => {
        this.setState({open: true});
    };
    getElapsedTime(date) : string {
        let today = new Date();
        let diffMs = (date.getTime() - today.getTime());
        let diffDays = Math.floor(diffMs / 86400000);

        if (diffDays < 1) {
            let hours = Math.round(Math.abs(today.getTime() - date.getTime()) / 36e5);
            if (hours < 1) {
                let diffMins = Math.abs(Math.round(((diffMs % 86400000) % 3600000) / 60000));
                if (diffMins < 2)
                    return diffMins + " minutes";
                return diffMins + " minute";
            }
            else if (hours < 2)
                return hours + " heure";
            else
                return hours + " heures";
        }
        else {
            if (diffDays < 2)
                return diffDays + " jour";
            return diffDays + " jours";
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid item md={12} lg={12} xs={12} className="card">
                <Card onClick={this.handleOpenEdit}>
                    <CardHeader className={classes.cardHeader} avatar={this.renderAvatar()}
                                title={this.props.user && this.props.user.firstName + " " + this.props.user.lastName || <LinearProgress />}
                    />
                    <img className="media-card" src={this.state.didLoad ? this.props.picture.url : "https://via.placeholder.com/500/f5f5f5"} alt={this.props.picture.description} onLoad={this.onLoad}/>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Ajouter aux favoris">
                            <Icon>favorite_border</Icon>
                        </IconButton>
                        <IconButton aria-label="Commenter">
                            <Icon>chat_bubble_outline</Icon>
                        </IconButton>
                        <IconButton aria-label="Partager">
                            <Icon>share_outline</Icon>
                        </IconButton>
                    </CardActions>
                    <CardActions className={classes.actions} disableActionSpacing>
                        {this.props.picture.user && this.props.picture.user.id + " " + this.props.picture.description}
                    </CardActions>
                    <CardActions className={classes.actions} disableActionSpacing>
                        {this.props.picture.tags.map((item, key) =>
                           "#" + item + " "
                        )}
                    </CardActions>
                    <CardActions className={classes.actions} disableActionSpacing>
                        {this.props.picture.mentions.map((item, key) =>
                            "#" + item + " "
                        )}
                    </CardActions>
                    <CardActions className={classes.actions} disableActionSpacing>
                        {"Il y a " + this.getElapsedTime(new Date(Number(this.props.picture.createdDate)))}
                    </CardActions>
                </Card>
                <Dialog onClose={this.handleCloseEdit} scroll="body" open={this.state.open}>
                        <PictureItem user={this.props.user} picture={this.props.picture} isHome={true}/>
                </Dialog>
            </Grid>
        );
    }
}
export default withStyles(styles)(PictureItemHome);
