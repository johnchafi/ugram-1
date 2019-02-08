import * as React from 'react'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {Button, createStyles, Modal, Theme,
    withStyles
} from "@material-ui/core";
import Picture from "../../models/Picture";
import User from "../../models/User";
import PictureItem from "../../containers/Picture/PictureItem";
export interface Props {
    picture : Picture,
    classes:PropTypes.object.isRequired
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
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 55,
        padding: theme.spacing.unit * 6,
        outline: 'none',
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

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        this.setState({open: false});
    }

    handleCloseEdit = event => {
        this.setState({open: false});
    };

    handleOpenEdit = event => {
        this.setState({open: true});
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid item xs={12} md={6} lg={4}>
                <Button onClick={this.handleOpenEdit}>
                    <Card className={classes.card}>
                        <CardMedia className={classes.media} image={this.props.picture.url|| "//"} title={this.props.picture.description}/>
                    </Card>
                </Button>
                <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={this.state.open} onClose={this.handleCloseEdit}>
                    <div style={getModalStyle()} className={this.props.classes.paper}>
                        <PictureItem user={this.props.user} picture={this.props.picture} isHome={false}/>
                    </div>
                </Modal>
            </Grid>
        );
    }
}
export default withStyles(styles)(PictureItemProfil);
