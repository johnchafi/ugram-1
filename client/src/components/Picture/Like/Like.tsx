import * as React from 'react'
import {Link} from 'react-router-dom';
import Picture from "../../../models/Picture";
import {Like, LikeUser} from "../../../models/Like";
import {
    CardActions,
    CircularProgress,
    Grid,
    Icon,
    IconButton,
    Typography,
    WithStyles,
    withStyles
} from "@material-ui/core";
import * as ReactGA from "react-ga";

export interface Props extends WithStyles<typeof styles>{
    likes : Like[],
    user : string,
    load : boolean,
    picture : Picture
    addLike : (like : Like) => any
    deleteLike : (like : Like) => any
}

export  interface State {
    ownLikes: Like[]
    like : boolean
    expanded: boolean,
    load  : boolean
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

class Likes extends React.Component<Props, State> {

    constructor(props : Props) {
        super(props);
        this.state = {
            ownLikes : this.props.likes.length === 0 ? [] : this.props.likes.filter(like => like.pictureId === this.props.picture.id),
            like : false,
            expanded: false,
            load : false
        }
    }

    componentDidMount(): void {
        this.setState({like :  this.state.ownLikes.filter(like => like.userId === this.props.user).length > 0})
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.likes !== this.props.likes){
            if (nextProps.likes.length === 0)
                this.setState({ownLikes: []});
            else
                this.setState({ownLikes: nextProps.likes.filter(like => like.pictureId === this.props.picture.id)});
            this.setState({load : nextProps.load});
        }
    }

    componentWillUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): void {
        if (nextState.ownLikes !== this.state.ownLikes)
            this.setState({like :  nextState.ownLikes.filter(like => like.userId === this.props.user).length > 0})
    }


    handleLike = () => {
        if (this.state.like) {
            this.props.deleteLike(this.state.ownLikes.filter(like => like.userId === this.props.user)[0]);
            this.setState({load: true});
            ReactGA.event({
                category: 'Social',
                action: 'Unlike',
                label: 'User unliked a picture',
                value : this.props.picture.id
            });
        }
        else {
            this.props.addLike(new LikeUser(this.props.user, this.props.picture.id, this.props.picture.userId));
            this.setState({load : true});
            ReactGA.event({
                category: 'Social',
                action: 'Like',
                label: 'User liked a picture',
                value : this.props.picture.id
            });
        }

    };


    render() {
        return (
            <CardActions className={"icon-header"} disableActionSpacing>
                { this.state.load && <CircularProgress disableShrink /> || <IconButton onClick={this.handleLike}>
                    <Icon style={{color: this.state.like === true ? 'red' : 'black'}}>favorite</Icon>
                </IconButton>}
                <Typography>
                    {this.state.ownLikes.length}   {this.state.ownLikes.length > 1  && "mentions" || "mention"} J'aime
                </Typography>
            </CardActions>
        );
    }
}
export default withStyles(styles)(Likes);
