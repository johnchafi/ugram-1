import * as React from 'react'
import {Link} from 'react-router-dom';
import Picture from "../../../models/Picture";
import {Like, LikeUser} from "../../../models/Like";
import {CardActions, Grid, Icon, IconButton, Typography} from "@material-ui/core";

export interface Props{
    likes : Like[],
    user : string,
    picture : Picture
    addLike : (like : Like) => any
    deleteLike : (like : Like) => any
}

export  interface State {
    ownLikes: Like[]
    like : boolean
}

class Likes extends React.Component<Props, State> {

    constructor(props : Props) {
        super(props);
        this.state = {
            ownLikes : [],
            like : false
        }
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.likes !== this.props.likes){
            if (nextProps.likes.length === 0)
                this.setState({ownLikes: []});
            else
                this.setState({ownLikes: nextProps.likes.filter(like => like.pictureId === this.props.picture.id)});
        }
    }

    componentWillUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): void {
        if (nextState.ownLikes !== this.state.ownLikes)
            this.setState({like :  nextState.ownLikes.filter(like => like.userId === this.props.user).length > 0})
    }


    handleLike = () => {
        if (this.state.like)
            this.props.deleteLike(this.state.ownLikes[0]);
        else
            this.props.addLike(new LikeUser(this.props.user, this.props.picture.id, this.props.picture.userId));

    };


    render() {
        return (

            <CardActions className={"icon-header"} disableActionSpacing>
                <IconButton onClick={this.handleLike}>
                    <Icon style={{color: this.state.like === true ? 'red' : 'black'}}>favorite</Icon>
                </IconButton>
                <Typography>
                    {this.state.ownLikes.length}   {this.state.ownLikes.length > 1  && "mentions" || "mention"} J'aime
                </Typography>
            </CardActions>
        );
    }
}
export default Likes;
