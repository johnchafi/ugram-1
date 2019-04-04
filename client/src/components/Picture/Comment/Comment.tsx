import * as React from 'react'
import {Link} from 'react-router-dom';
import {
    List,
    ListItem, Typography, IconButton, Icon, Button, Dialog, DialogTitle, DialogContent, DialogActions
} from "@material-ui/core";
import Picture from "../../../models/Picture";
import {Comment} from "../../../models/Comment";
import CommentItem from "../../../containers/Picture/Comment/CommentItem";

export interface Props{
    comments : Comment[],
    user : string,
    picture : Picture
    deleteComment : (comment : Comment) => any
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
    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.comments !== this.props.comments){
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
                                <CommentItem comment={comment} user={this.props.user}/>
                                </ListItem>
                            </div>
                        )
                    }
                )}
            </List>
        );
    }
}
export default Comments;
