import * as React from 'react'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {
    Button, createStyles, Modal, Theme, WithStyles,
    withStyles
} from "@material-ui/core";
import Picture from "../../models/Picture";
import User from "../../models/User";
import PictureItem from "../../containers/Picture/PictureItem";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";

export interface Props extends WithStyles<typeof styles>{
    picture : Picture,
    user : User
    isHome:boolean
    deletePicture : (string, number) => any
}
interface State {
    anchorEl: HTMLElement
    open: boolean
}


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


const styles = (theme: Theme) => createStyles({
    card: {
        minWidth: 200,
        maxWidth: 200,
        maxHeight:200,
        minHeight:200,
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
    },
});



class PictureItemProfil extends React.Component<Props,State> {

    constructor(props : Props)
    {
        super(props);
        this.state = {
            anchorEl:null,
            open:false,
        }
    }

    handleCloseEdit = event => {
        this.setState({open: false});
    };

    handleOpenEdit = event => {
        this.setState({open: true});
    };

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (this.props.picture !== nextProps.picture)
            this.setState({open:false});
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid item xs={4}>
                <Button onClick={this.handleOpenEdit}>
                        <img style={{ width:280, height: 280 }} src={this.props.picture.url|| "//"} alt={this.props.picture.description}/>
                </Button>
                <Dialog onClose={this.handleCloseEdit} scroll="body" open={this.state.open}>
                    <PictureItem user={this.props.user} picture={this.props.picture} isHome={false}/>
                </Dialog>
            </Grid>
        );
    }
}
export default withStyles(styles)(PictureItemProfil);
