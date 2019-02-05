import * as React from 'react'
import {CircularProgress, Grid} from "@material-ui/core";
import Picture from "../../models/Picture";
import PictureList from "../PictureList/PictureList";

export interface Props {
    getPicturesByDate: () => any
    pictures: Picture[],
}
interface State {
    isLoading: boolean
}


class Home extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.props.getPicturesByDate();
        this.state = {
            isLoading:true
        }
    }
    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {

        if (nextProps.pictures)
            this.setState({isLoading: false});
    }

    render() {
        return (
            <Grid container spacing={24}  justify="center">
                {this.state.isLoading && <CircularProgress color="secondary" />}
                {!this.state.isLoading && <PictureList pictures={this.props.pictures} isHome={true}/>}
            </Grid>
        );
    }
}

export default Home;
