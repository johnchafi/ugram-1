import * as React from 'react'
import {Link} from 'react-router-dom';
import {
    Avatar,
    List,
    ListItem,
    ListItemText, Divider
} from "@material-ui/core";
import Picture from "../../models/Picture";
import User from "../../models/User";
import {Comment} from "../../models/Comment";

export interface Props{
    comments : Comment[],
    user : User,
    picture : Picture
    addComment : (comment : Comment) => any
    deleteComment : (comment : Comment, userId : string) => any
}

export  interface State {
    ownComments: Comment[]
}

class Comments extends React.Component<Props, State> {

    constructor(props : Props) {
        super(props);
        this.state = {
            ownComments : []
        }
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.comments !== this.props.comments){
            console.log(nextProps.comments);
            this.setState({ownComments: nextProps.comments.filter(comment => comment.pictureId === this.props.picture.id)});
        }
    }


    render() {
        return (
            <List>
                {this.state.ownComments.map((comment : Comment) => {
                        return (
                            <div key={comment.id}>
                                <ListItem>
                                    <Avatar>
                                        {comment.userId}
                                    </Avatar>
                                    <ListItemText primary="Photos" secondary={comment.message} />
                                </ListItem>
                                <li>
                                    <Divider variant="inset" />
                                </li>
                            </div>
                        )
                    }
                )}
            </List>
        );
    }
}
export default Comments;
