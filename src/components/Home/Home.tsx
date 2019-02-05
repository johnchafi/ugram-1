import * as React from 'react'
import {Grid, SnackbarContent, Snackbar} from "@material-ui/core";
import Picture from "../../models/Picture";
import PictureList from "../../containers/PictureList/PictureList";
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
            this.props.overGetPics(nextProps.pictures);
        }
    }

    render() {
        return (
            <Grid container spacing={24}  justify="center">
                <PictureList isHome={true}/>
            </Grid>
        );
    }
}

export default Home;
