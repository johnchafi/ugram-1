import * as React from 'react'
import {Link} from 'react-router-dom';
import {
    Avatar,
    CardActions,
    CircularProgress,
    LinearProgress,
    Icon,
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
    addComment : (string, number) => any
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
            let comment : Comment[] = [];
            comment.push(nextProps.comments.find(comment => comment.pictureId === this.props.picture.id));
            this.setState({ownComments: comment});
        }
    }


    render() {
        return (
            <List>
                {this.state.ownComments.map((comment : Comment) => {
                        return (
                            <div>
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
