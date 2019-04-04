
import * as React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
import {Avatar, CardActions, CircularProgress, Icon, LinearProgress} from "@material-ui/core";
import Picture from "../../models/Picture";
import User from "../../models/User";
import EditPictureItem from "../../containers/Picture/EditPictureItem";
import Helper from "../../helper/helper";

export interface Props{
    picture : Picture,
    user : User
    isHome:boolean
    isMe:boolean
}
interface State {
}



class PictureItem extends React.Component<Props,State> {

    constructor(props : Props)
    {
        super(props);
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

    getImageStyle() {
        let width, height, rotation;

        if (this.props.picture.width && this.props.picture.width != 0)
            width = this.props.picture.width;
        else
            width = 600;

        if (this.props.picture.height && this.props.picture.height != 0)
            height = this.props.picture.height;
        else
            height = "auto";


        if (this.props.picture.rotation && this.props.picture.rotation != 0)
            rotation = "rotate(" + this.props.picture.rotation + "deg)";
        else
            rotation = "none";


        return {
            width: width,
            height: height,
            tranform: rotation
        };
    }

    render() {
        return (
            <Card className={"container-picture"}>
                <Link to={this.props.user ? `/profil/${this.props.user.id}` : ''}>
                    <CardHeader action={ !this.props.isHome && this.props.isMe && <EditPictureItem picture={this.props.picture}/>} className={"item"} avatar={this.renderAvatar()} title={this.props.user && this.props.user.firstName + " " + this.props.user.lastName || <LinearProgress />}/>
                </Link>
                <img style={this.getImageStyle()} className="media-card" src={this.props.picture.url} alt={this.props.picture.description}/>
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
                        <p><span>{this.props.user && this.props.user.id}</span>
                            {"\u00a0" + this.props.picture.description}</p>
                    </CardActions>
                    <CardActions className={"action hashtags"} disableActionSpacing>
                        {this.props.picture.tags.length > 0 &&
                        this.props.picture.tags.map((item) => {
                                if (item != "")
                                    return "#" + item + " "
                            }
                        )}
                    </CardActions>
                    <CardActions className={"action mentions"} disableActionSpacing>
                        {this.props.picture.mentions.length > 0 &&
                        this.props.picture.mentions.map((item) => {
                                if (item != "")
                                   return "@" + item + " "
                            }
                        )}
                    </CardActions>
                    <CardActions className={"action date"} disableActionSpacing>
                        {"Il y a " + Helper.getElapsedTime(new Date(Number(this.props.picture.createdDate)))}
                    </CardActions>
                </Grid>
            </Card>
        );
    }
}
export default (PictureItem);
