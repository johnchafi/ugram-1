import * as React from 'react'
import {CircularProgress, Grid} from "@material-ui/core";
import Picture from "../../models/Picture";
import PictureList from "../../containers/Picture/PictureList";
import { Redirect } from 'react-router';

export interface Props {
    getPicturesByDate: () => any
    overGetPics:(picture: Picture[]) => any,
    pictures: Picture[],
    finish:boolean
    history: any
}
interface State {
    isLoading: boolean
}


class Home extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            isLoading:true,
        }
    }

    componentWillMount(): void {
        this.props.getPicturesByDate();
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.finish) {
            console.log(nextProps.finish);
            nextProps.overGetPics(nextProps.pictures);
            this.setState({isLoading:false});
        }
    }

    render() {
        return (
            <Grid
                container
                spacing={24}
                direction="column"
                alignItems="center"
            >
                {this.state.isLoading && <CircularProgress />}
                { !this.state.isLoading && <PictureList isHome={true}/>}
            </Grid>
        );
    }
}

export default Home;
