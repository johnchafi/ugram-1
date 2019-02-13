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

    handleAddMentions = event => {
        this.state.picture.mentions.push("");
        this.setState({picture: this.state.picture});
    };

    handleDeleteMentions= (e, id) => {
        delete this.state.picture.mentions[id];
        this.setState({picture: this.state.picture});
    };

    handleChangeTag = (event, id) => {
        this.state.picture.tags[id] = event.target.value;
        this.setState({picture: this.state.picture});
    };

    handleChangeDescription = (event) => {
        this.state.picture.description = event.target.value;
        this.setState({picture: this.state.picture});
    };

    handleChangeMention = (event, id) => {
        this.state.picture.mentions[id] = event.target.value;
        this.setState({picture: this.state.picture});
    };

    handleAddTags = event => {
        this.state.picture.tags.push("");
        this.setState({picture: this.state.picture});
    };

    handleDeleteTags = (e, id) => {
        delete this.state.picture.tags[id];
        this.setState({picture: this.state.picture});
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
                <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={this.state.open} onClose={this.handleCloseEdit}>
                    <div  className={this.props.classes.paper + " modal"}>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <Grid xs={12} item>
                                <Typography variant="h6" id="modal-title">
                                    Modifier la photo
                                </Typography>
                            </Grid>
                            <Grid xs={12} item>
                                <FormControl>
                                    <TextField  margin="normal" label="Description" defaultValue={this.state.picture.description} onChange={(e) => this.handleChangeDescription(e)}> </TextField>
                                    {this.state.picture.tags.map(function (tag, key) {
                                        return  (
                                            <Grid key={key}>
                                                <TextField margin="normal" label="Mot-clés" defaultValue={tag} onChange={(e) => this.handleChangeTag(e, key)}/>
                                                <IconButton onClick={(e) => this.handleDeleteTags(e, key)}>
                                                    <Icon color="secondary">
                                                        restore_from_trash</Icon>
                                                </IconButton>
                                            </Grid>)
                                    }.bind(this))}
                                    {this.state.picture.mentions.map(function (mentions, key) {
                                        return  (
                                            <Grid key={key}>
                                                <TextField label="Mentions"  margin="normal" defaultValue={mentions} onChange={(e) => this.handleChangeMention(e, key)}/>
                                                <IconButton onClick={(e) => this.handleDeleteMentions(e, key)}>
                                                    <Icon color="secondary">
                                                        restore_from_trash
                                                    </Icon>
                                                </IconButton>
                                            </Grid>)
                                    }.bind(this))}
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <Grid container spacing={8}>
                                            <Grid container item xs={3}>
                                                <Button color="primary" variant="contained" onClick={this.handleAddTags}>#
                                                    <Icon color="action">
                                                        add_circle
                                                    </Icon>
                                                </Button>
                                            </Grid>
                                            <Grid container item xs={4}>
                                                <Button color="primary" variant="contained" onClick={this.handleAddMentions} >Mentions
                                                    <Icon color="action">
                                                        add_circle
                                                    </Icon>
                                                </Button>
                                            </Grid>
                                            <Grid container item xs={5}>
                                                <Button color="primary" variant="contained" onClick={this.handleEditPicture} >Sauvegarder
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default withStyles(styles)(EditPictureItem);
