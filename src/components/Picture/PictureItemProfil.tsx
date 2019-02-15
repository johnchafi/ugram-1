import * as React from 'react'
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import Picture from "../../models/Picture";
import User from "../../models/User";
import PictureItem from "../../containers/Picture/PictureItem";
import Dialog from '@material-ui/core/Dialog';

export interface Props{
    picture : Picture,
    user : User
    isHome:boolean
    deletePicture : (string, number) => any
}
interface State {
    anchorEl: HTMLElement
    open: boolean
}


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
        return (
            <Grid item xs={4} className="pictureProfil">
                <img onClick={this.handleOpenEdit} style={{ width:'100%', height:'100%'}} src={this.props.picture.url|| "//"} alt={this.props.picture.description}/>
                <Dialog onClose={this.handleCloseEdit} scroll="body" open={this.state.open}>
                    <PictureItem user={this.props.user} picture={this.props.picture} isHome={false}/>
                </Dialog>
            </Grid>
        );
    }
}
export default (PictureItemProfil);
