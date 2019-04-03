import * as React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
import {Avatar, CardActions, CircularProgress, LinearProgress, Icon} from "@material-ui/core";
import Picture from "../../models/Picture";
import User from "../../models/User";
import PictureItem from "../../containers/Picture/PictureItem";
import Dialog from "@material-ui/core/Dialog";
import Helper from "../../helper/helper";
import Comment from "../../containers/Comment/Comment";

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
                <Card onClick={this.handleOpenEdit} className={"container-picture"}>

                    <Link to={this.props.user ? `/profil/${this.props.user.id}` : ''}>
                        <CardHeader className="cardheader" avatar={this.renderAvatar()} title={this.props.user && this.props.user.firstName + " " + this.props.user.lastName || <LinearProgress />}/>
                    </Link>
                    <img className="media-card" src={this.state.didLoad ? this.props.picture.url : "https://via.placeholder.com/500/f5f5f5"} alt={this.props.picture.description} onLoad={this.onLoad}/>
                    <Grid className={"container"}>
                        <CardActions className={"icon-header"} disableActionSpacing>
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
                        <CardActions className={"action header"} disableActionSpacing>
                            <p><span>{this.props.picture.user && this.props.picture.user.id}</span>
                                {"\u00a0" + this.props.picture.description}</p>
                        </CardActions>
                        <CardActions className={"action header"} disableActionSpacing>
                            <Comment picture={this.props.picture}/>
                        </CardActions>
                        <CardActions className={"action hashtags"} disableActionSpacing>
                            {this.props.picture.tags.map((item) => {
                                    if (item != "")
                                        return ("#" + item + " ")
                                }
                            )}
                        </CardActions>
                        <CardActions className={"action mentions"} disableActionSpacing>
                            {this.props.picture.mentions.length > 0 && this.props.picture.mentions.map((item) => {
                                    if (item != "")
                                        return ("@" + item + " ")
                                }
                            )}
                        </CardActions>
                        <CardActions className={"action date"} disableActionSpacing>
                            {"Il y a " + Helper.getElapsedTime(new Date(Number(this.props.picture.createdDate)))}
                        </CardActions>
                    </Grid>
                </Card>
                <Dialog onClose={this.handleCloseEdit} scroll="body" open={this.state.open} className={"dialogPicture"}>
                    <PictureItem user={this.props.user} picture={this.props.picture} isHome={true}/>
                </Dialog>
            </Grid>
        );
    }
}
export default PictureItemHome;
