import * as React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {Avatar, CardActions, CircularProgress, Icon, LinearProgress} from "@material-ui/core";
import Picture from "../../models/Picture";
import User from "../../models/User";
import EditPictureItem from "../../containers/Picture/EditPictureItem";
import Helper from "../../helper/helper";
import Like from "../../containers/Picture/Like/Like";
import Comment from "../../containers/Picture/Comment/Comment";
import FormComment from "../../containers/Picture/Comment/FormComment";
export interface Props{
    picture : Picture,
    user : User
    isHome:boolean
    isMe:boolean
    preview: boolean
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
    render() {
        return (
            <Card className={"container-picture"}>
                <Link to={this.props.user ? `/profil/${this.props.user.id}` : ''}>
                    <CardHeader action={ !this.props.isHome && this.props.isMe && <EditPictureItem picture={this.props.picture}/>} className={"item"} avatar={this.renderAvatar()} title={this.props.user && this.props.user.firstName + " " + this.props.user.lastName || <LinearProgress />}/>
                </Link>
                <img className="media-card" src={this.props.picture.url.original} alt={this.props.picture.description}/>
                <Grid className={"container"}>
                    <Like picture={this.props.picture}/>
                    <CardActions className={"action header"} disableActionSpacing>
                        <p><span>{this.props.user && this.props.user.id}</span>
                            {"\u00a0" + this.props.picture.description}</p>
                    </CardActions>
                    <CardActions className={"action hashtags"} disableActionSpacing>
                        {this.props.picture.tags.length > 0 &&
                        this.props.picture.tags.map((item, key) => {
                                if (item != "")
                                    return  <Link to={`/tag/${item}`} key={key}>{"#" + item + " "}</Link>
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
                    <CardActions className={"action header"} disableActionSpacing style={{position : "relative"}}>
                        <Comment picture={this.props.picture}/>
                    </CardActions>
                    <CardActions className={"action date"} disableActionSpacing>
                        {"Il y a " + Helper.getElapsedTime(new Date(Number(this.props.picture.createdDate)))}
                    </CardActions>
                    {
                        !this.props.preview &&  <FormComment picture={this.props.picture} user={this.props.user}/>
                    }
                </Grid>
            </Card>
        );
    }
}
export default (PictureItem);
