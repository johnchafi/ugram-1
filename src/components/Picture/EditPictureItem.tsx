import * as React from 'react'
import Picture from "../../models/Picture";
import {
    Button,
    createStyles,
    FormControl,
    Grid,
    Modal, Popover,
    TextField,
    Theme,
    Typography,
    WithStyles,
    withStyles
} from "@material-ui/core";
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as cloneDeep from 'lodash/cloneDeep';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const styles = (theme: Theme) => createStyles({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    card: {
        minWidth: 500,
    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    typography: {
        margin: theme.spacing.unit * 2,
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
});


export interface Props extends WithStyles<typeof styles>{
    editPicture: (Picture) => any
    picture: Picture
    deletePicture : (string, number) => any
}
interface State {
    picture: Picture
    open: boolean
    anchorEl: HTMLElement
}


class EditPictureItem extends React.Component<Props,State> {


    constructor(props: Props)
    {
        super(props);
        this.state = {
            picture: cloneDeep({... this.props.picture}),
            anchorEl:null,
            open: false
        }
    }
    handleChangeTag = (event) => {
        this.setState({
            picture: {
                ...this.state.picture,
                tags: event.target.value.replace(/\s+/g, ' ').trim().split(' ')
            }
        });
    };

    handleChangeDescription = (event) => {
        this.state.picture.description = event.target.value;
        this.setState({picture: this.state.picture});
    };

    handleChangeMention = (event) => {
        this.setState({
            picture: {
                ...this.state.picture,
                mentions: event.target.value.replace(/\s+/g, ' ').trim().split(' ')
            }
        });
    };
    handleEditPicture = event => {
        this.props.editPicture(this.state.picture);
    };

    handleCloseEdit = event => {
        this.setState({open: false});
    };

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        this.setState({open: true});
    }

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };


    handleSuppress = event => {
        this.props.deletePicture(this.props.picture.userId, this.props.picture.id);
        this.setState({
            anchorEl: null,
        });
    };

    handleEdit = event => {
        this.setState({
            open: !this.state.open,
        });
    };


    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div>
                <IconButton aria-owns={open ? 'simple-popper' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick}>
                    <MoreVertIcon/>
                </IconButton>
                <Popover id="simple-popper" open={open} anchorEl={anchorEl} onClose={this.handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center',}} transformOrigin={{vertical: 'top', horizontal: 'center',}}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid container direction="column" justify="center" alignItems="center">
                            <IconButton onClick={this.handleSuppress} color="secondary">
                                <Icon color="action">
                                    delete
                                </Icon>
                            </IconButton>
                            <IconButton onClick={this.handleEdit} color="primary">
                                <Icon color="action">
                                    edit
                                </Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Popover>
                <Dialog   aria-labelledby="form-dialog-title" open={this.state.open} onClose={this.handleCloseEdit}>
                    <DialogTitle id="form-dialog-title">
                        Modifier la photo
                    </DialogTitle>
                    <DialogContent>
                        <TextField  margin="normal" label="Description" defaultValue={this.state.picture.description} onChange={(e) => this.handleChangeDescription(e)} fullWidth/>
                        <Grid>
                            <TextField margin="normal" label="Mot-clés" defaultValue={this.state.picture.tags.join(" ")} onChange={(e) => this.handleChangeTag(e)}/>
                        </Grid>
                        <Grid>
                            <TextField label="Mentions"  margin="normal" defaultValue={this.state.picture.mentions.join(" ")} onChange={(e) => this.handleChangeMention(e)}/>
                        </Grid>
                        <DialogActions>
                            <Button color="primary" variant="contained" onClick={this.handleEditPicture} >Sauvegarder
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
export default withStyles(styles)(EditPictureItem);
