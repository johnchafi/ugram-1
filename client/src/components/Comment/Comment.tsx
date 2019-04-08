import * as React from 'react'
import {Link} from 'react-router-dom';
import {
    List,
    ListItem, Typography, IconButton, Icon, Button, Dialog, DialogTitle, DialogContent, DialogActions
} from "@material-ui/core";
import Picture from "../../models/Picture";
import {Comment} from "../../models/Comment";

export interface Props{
    comments : Comment[],
    user : string,
    picture : Picture
    deleteComment : (comment : Comment, userId : string) => any
}

export  interface State {
    ownComments: Comment[]
    open : boolean
}

class Comments extends React.Component<Props, State> {

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

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.comments !== this.props.comments){
            console.log(nextProps.comments);
            if (nextProps.comments.length === 0)
                this.setState({ownComments: []});
            else
                this.setState({ownComments: nextProps.comments.filter(comment => comment.pictureId === this.props.picture.id)});
        }
    }


    render() {
        return (
            <List>
                {this.state.ownComments.map((comment : Comment) => {
                        return (
                            <div key={comment.id}>
                                <ListItem style={{paddingLeft: 0, paddingTop: 0, paddingBottom: 0}}>
                                    <Typography style={{fontWeight: 900, fontSize: 'small', minWidth : 100}}>
                                        {comment.userId}
                                    </Typography>
                                    <Typography style={{fontSize: 'small', marginLeft: 10}}>
                                        {comment.message}
                                    </Typography>
                                    {this.props.user === comment.userId &&  <IconButton style={{color: '#8B8B8B', backgroundColor: 'transparent'}} onClick={(e) => this.handleClickOpen()}>
                                        <Icon style={{fontSize:"18px"}}>more_horiz</Icon>
                                    </IconButton> }
                                </ListItem>
                                <Dialog
                                    onClose={this.handleClose}
                                    aria-labelledby="customized-dialog-title"
                                    open={this.state.open}
                                >
                                    <List>
                                        <ListItem button divider onClick={(e) => {this.props.deleteComment(comment, this.props.user); this.setState({open: false})}}>
                                                <Typography style={{fontWeight: 600, color: "#d52941", fontSize: 18}}>Supprimer</Typography>
                                        </ListItem>
                                        <ListItem button divider onClick={(e) => {this.setState({open: false})}}>
                                                <Typography style={{fontWeight: 600, color: "#d52941", fontSize: 18}}>Fermer</Typography>
                                        </ListItem>
                                    </List>
                                </Dialog>
                            </div>
                        )
                    }
                )}
            </List>
        );
    }
}
export default Comments;
