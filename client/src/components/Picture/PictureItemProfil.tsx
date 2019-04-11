import * as React from 'react'
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import Picture from "../../models/Picture";
import User from "../../models/User";
import PictureItem from "../../containers/Picture/PictureItem";
import Dialog from '@material-ui/core/Dialog';
import { History } from 'history';


export interface Props {
    picture : Picture,
    user : User
    isHome:boolean
    isMe: boolean
    history : History
    deletePicture : (string, number) => any
    location:{search : any}
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

    componentDidMount() {
        const values = new URLSearchParams(this.props.location.search);
        if (values && parseInt(values.get('search')) === this.props.picture.id ) {
            this.setState({open:true});
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
        if (nextProps.location.search) {
            const values = new URLSearchParams(this.props.location.search);
            if (values && parseInt(values.get('search')) === nextProps.picture.id )
                this.setState({open: true});
        }
    }

    render() {
        return (
            <Grid className="containerPictureProfil" item xs={4}>
                <Grid  onClick={this.handleOpenEdit} className="pictureProfil" style={{backgroundImage: "url(" + this.props.picture.url["300"] + ")"}}/>
                <Dialog onClose={this.handleCloseEdit} scroll="body" open={this.state.open}>
                    <PictureItem user={this.props.user} picture={this.props.picture} isHome={false} isMe={this.props.isMe}/>
                </Dialog>
            </Grid>
        );
    }
}
export default (PictureItemProfil);
