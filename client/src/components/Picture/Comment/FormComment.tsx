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
    TextField, Grid, WithStyles, CircularProgress
} from "@material-ui/core";
import Picture from "../../../models/Picture";
import {Comment as CommentType, Comment, CommentUser} from "../../../models/Comment";
import User from "../../../models/User";
import * as ReactGA from "react-ga";

export interface Props {
    picture : Picture,
    user : User,
    me : string
    addComment : (comment : CommentType) => any,
    load : boolean
}
interface State {
    open: boolean,
    message: string,
    load : boolean
}



class FormComment extends React.Component<Props, State> {

    constructor(props : Props) {
        super(props);
        this.state = {
            open : false,
            message: '',
            load : false
        }
    }

    addComment = event => {
        this.setState({message:  event.target.value});
    };

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.load !== this.props.load)
            this.setState({load: nextProps.load});
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.addComment(new CommentUser(this.props.me, this.state.message, this.props.picture.id, this.props.picture.userId));
        ReactGA.event({
            category: 'Social',
            action: 'Commented Picture'
        });
        this.setState({message : ''});
        this.setState({load : true});
    };


    render() {
        return (
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
                    { this.state.load && <CircularProgress disableShrink /> ||  <Button disabled={this.state.message.length === 0} color="primary" onClick={this.handleSubmit} style={{backgroundColor: 'transparent'}}>
                        {this.state.message.length > 0 && <Typography style={{fontWeight: 600, color: "#3897f0", fontSize: 12}}>Publier</Typography>}
                        {this.state.message.length === 0 && <Typography style={{fontWeight: 600, color: "#c6c6c6", fontSize: 12}}>Publier</Typography>}
                    </Button>}
                </form>
            </CardActions>
        );
    }
}
export default FormComment;
