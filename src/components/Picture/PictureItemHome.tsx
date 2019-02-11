import * as React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Link} from 'react-router-dom';
import {
    Avatar, Button,
    CardActions,
    CircularProgress,
    createStyles,
    LinearProgress, Modal,
    Theme,
    WithStyles,
    withStyles
} from "@material-ui/core";
import Picture from "../../models/Picture";
import '../../../scss/app.scss';
import User from "../../models/User";
import PictureItem from "../../containers/Picture/PictureItem";
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

    render() {
        const {classes} = this.props;
        return (
            <Grid item md={12} lg={12} xs={12} className="card">
                <Card onClick={this.handleOpenEdit}>
                    <CardHeader className={classes.cardHeader} avatar={this.renderAvatar()}
                                title={this.props.user && this.props.user.firstName + " " + this.props.user.lastName || <LinearProgress />}
                                subheader={new Date(Number(this.props.picture.createdDate)).toDateString()}
                    />
                    <img className="media-card" src={this.state.didLoad ? this.props.picture.url : "https://via.placeholder.com/600/f5f5f5"} alt={this.props.picture.description} onLoad={this.onLoad}/>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <Grid item xs zeroMinWidth>
                            <Typography variant="overline">
                                {this.props.picture.description && this.props.picture.description + this.props.picture.mentions.map(function (mention, i) {
                                    return " " + mention;
                                }) + " // " + this.props.picture.tags.map(function (tag, i) {return "#" + tag;})}
                            </Typography>
                        </Grid>
                    </CardActions>
                </Card>
                <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={this.state.open} onClose={this.handleCloseEdit}>
                    <div style={getModalStyle()} className="div-profil">
                        <PictureItem user={this.props.user} picture={this.props.picture} isHome={true}/>
                    </div>
                </Modal>
            </Grid>
        );
    }
}
export default withStyles(styles)(PictureItemHome);
