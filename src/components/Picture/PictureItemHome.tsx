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
export interface Props{
    picture : Picture,
    user : User
    isHome:boolean
    deletePicture : (string, number) => any
}
interface State {
    didLoad:boolean,
    open: boolean
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
            return ( <Avatar className="avatar-home-picture" aria-label="Recipe" src={this.props.user.pictureUrl}/>);
        else if (this.props.user != null && this.props.user.id)
            return ( <Avatar  className="avatar-home-picture" aria-label="Recipe" >{this.props.user.firstName.charAt(0)}</Avatar>);
        else
            return ( <Avatar  className="avatar-home-picture" aria-label="Recipe" ><CircularProgress disableShrink /></Avatar>)
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
        return (
            <Grid item md={12} lg={12} xs={12} className="card">
                <Card onClick={this.handleOpenEdit}>
                    <CardHeader className="cardheader" avatar={this.renderAvatar()}
                                title={this.props.user && this.props.user.firstName + " " + this.props.user.lastName || <LinearProgress />}
                                subheader={new Date(Number(this.props.picture.createdDate)).toDateString() + " - " + this.props.picture.description}
                    />
                    <img className="media-card" src={this.state.didLoad ? this.props.picture.url : "https://via.placeholder.com/500/f5f5f5"} alt={this.props.picture.description} onLoad={this.onLoad}/>
                    <CardActions className="actions" disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <Grid item xs zeroMinWidth>
                            <Typography className={"subtext"} variant="overline">
                                {this.props.picture.mentions.join(" ") + " // " + this.props.picture.tags.join(" #")}
                            </Typography>
                        </Grid>
                    </CardActions>
                </Card>
                <Dialog onClose={this.handleCloseEdit} scroll="body" open={this.state.open}>
                        <PictureItem user={this.props.user} picture={this.props.picture} isHome={true}/>
                </Dialog>
            </Grid>
        );
    }
}
export default PictureItemHome;
