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
            <Grid item xs={4}>
                <Grid  onClick={this.handleOpenEdit} className="pictureProfil" style={{backgroundImage: "url(" + this.props.picture.url + ")"}}/>
                <Dialog onClose={this.handleCloseEdit} scroll="body" open={this.state.open}>
                    <PictureItem user={this.props.user} picture={this.props.picture} isHome={false}/>
                </Dialog>
            </Grid>
        );
    }
}
export default (PictureItemProfil);
