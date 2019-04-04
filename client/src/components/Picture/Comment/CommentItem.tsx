import * as React from 'react'
import {Link} from 'react-router-dom';
import {
    List,
    ListItem, Typography, IconButton, Icon, Button, Dialog, DialogTitle, DialogContent, DialogActions
} from "@material-ui/core";
import Picture from "../../../models/Picture";
import {Comment} from "../../../models/Comment";
import User from "../../../models/User";

export interface Props{
    comment : Comment,
    deleteComment : (comment : Comment) => any,
    user: User
}

export  interface State {
    ownComments: Comment[]
    open : boolean
}

class CommentItem extends React.Component<Props, State> {

    constructor(props : Props) {
        super(props);
        this.state = {
            ownComments : [],
            open : false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    render() {
        return (
            <div>
                {this.props.user === this.props.comment.userId &&  <IconButton style={{color: '#8B8B8B', backgroundColor: 'transparent'}} onClick={(e) => this.handleClickOpen()}>
                    <Icon style={{fontSize:"18px"}}>more_horiz</Icon>
                </IconButton> }
                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.open}
                >
                    <List>
                        <ListItem button divider onClick={(e) => {;this.props.deleteComment(this.props.comment); this.setState({open: false})}}>
                            <Typography style={{fontWeight: 600, color: "#d52941", fontSize: 18}}>Supprimer</Typography>
                        </ListItem>
                        <ListItem button divider onClick={(e) => {this.setState({open: false})}}>
                            <Typography style={{fontWeight: 600, color: "#d52941", fontSize: 18}}>Fermer</Typography>
                        </ListItem>
                    </List>
                </Dialog>
            </div>)

    }
}
export default CommentItem;
