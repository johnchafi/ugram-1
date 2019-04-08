import * as React from 'react'
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
import {
    Avatar,
    CardActions,
    CircularProgress,
    LinearProgress,
    Icon,
    TextField,
    Button,
    Grid,
    Card,
    Dialog,
    Typography, WithStyles, withStyles, Theme
} from "@material-ui/core";
import Picture from "../../models/Picture";
import User from "../../models/User";
import PictureItem from "../../containers/Picture/PictureItem";
import Helper from "../../helper/helper";
import Comment from "../../containers/Comment/Comment";
import {CommentUser, Comment as CommentType} from "../../models/Comment";

export interface Props extends WithStyles<typeof styles>{
    picture : Picture,
    user : User,
    me : string
    isHome:boolean
    addComment : (comment : CommentType) => any
    deletePicture : (string, number) => any
}
interface State {
    didLoad:boolean,
    open: boolean,
    message: string,
}

const styles = (theme: Theme) => ({
});
class PictureItemHome extends React.Component<Props,State> {

    constructor(props : Props) {
        super(props);

        this.state = {
            didLoad: false,
            open: false,
            message: '',
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



    addComment = event => {
        this.setState({message:  event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.addComment(new CommentUser(this.props.me, this.state.message, this.props.picture.id));
        this.setState({message : ''});
    };


    onLoad = () => {
        this.setState({
            didLoad: true
        });
    };

    handleOpenEdit = event => {
        this.setState({open: true});
    };
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
        // @ts-ignore
        return (
            <Grid item md={12} lg={12} xs={12} className="card">
                <Card className={"container-picture"}>

                    <Link to={this.props.user ? `/profil/${this.props.user.id}` : ''}>
                        <CardHeader className="cardheader" avatar={this.renderAvatar()} title={this.props.user && this.props.user.firstName + " " + this.props.user.lastName || <LinearProgress />}/>
                    </Link>
                    <img onClick={this.handleOpenEdit} style={this.getImageStyle()} className="media-card" src={this.state.didLoad ? this.props.picture.url : "https://via.placeholder.com/500/f5f5f5"} alt={this.props.picture.description} onLoad={this.onLoad}/>
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
                        <CardActions className={"action header"} disableActionSpacing>
                            <Comment picture={this.props.picture}/>
                        </CardActions>
                        <CardActions className={"action date"} disableActionSpacing>
                            {"Il y a " + Helper.getElapsedTime(new Date(Number(this.props.picture.createdDate)))}
                        </CardActions>
                        <CardActions style={{borderTop: '1px solid #80808042', padding: 0}}>
                            <form style={{display: "contents"}} onSubmit={this.handleSubmit}>
                                <TextField
                                    style={{ margin: 8}}
                                    placeholder="Ajouter un commentaire"
                                    fullWidth
                                    margin="normal"
                                    value={this.state.message}
                                    InputProps={{disableUnderline: true }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => this.addComment(e)}
                                />
                                <Button disabled={this.state.message.length === 0} color="primary" onClick={this.handleSubmit} style={{backgroundColor: 'transparent'}}>
                                    {this.state.message.length > 0 && <Typography style={{fontWeight: 600, color: "#3897f0", fontSize: 12}}>Publier</Typography>}
                                    {this.state.message.length === 0 && <Typography style={{fontWeight: 600, color: "#c6c6c6", fontSize: 12}}>Publier</Typography>}
                                </Button>
                            </form>
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
export default withStyles(styles)(PictureItemHome);
