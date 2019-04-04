import * as React from 'react'
import {Link} from 'react-router-dom';
import {
    List,
    ListItem,
    Typography,
    IconButton,
    Icon,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CardActions,
    withStyles, WithStyles, Collapse
} from "@material-ui/core";
import Picture from "../../../models/Picture";
import {Comment} from "../../../models/Comment";
import CommentItem from "../../../containers/Picture/Comment/CommentItem";
import classnames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export interface Props extends WithStyles<typeof styles>{
    comments : Comment[],
    user : string,
    picture : Picture
    deleteComment : (comment : Comment) => any
}

export  interface State {
    ownComments: Comment[]
    open : boolean
    expanded: boolean
}


const styles = theme => ({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});


class Comments extends React.Component<Props, State> {

    constructor(props : Props) {
        super(props);
        this.state = {
            ownComments : this.props.comments.length === 0 ? [] : this.props.comments.filter(comment => comment.pictureId === this.props.picture.id),
            open : false,
            expanded: false
        }
    }
    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.comments !== this.props.comments){
            if (nextProps.comments.length === 0)
                this.setState({ownComments: []});
            else
                this.setState({ownComments: nextProps.comments.filter(comment => comment.pictureId === this.props.picture.id)});
        }
    }


    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };


    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <CardActions style={{    position: "absolute",
                    right: 0, bottom : 0}}>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
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
                </Collapse>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(Comments);
