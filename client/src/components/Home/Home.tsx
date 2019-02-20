import * as React from 'react'
import {CircularProgress, Grid} from "@material-ui/core";
import PictureList from "../../containers/Picture/PictureList";
import { Redirect } from 'react-router';
import Props from "../../Props/Home";

interface State {
    isLoading: boolean,
}


class Home extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            isLoading:true,
        }
    }

    componentWillMount(): void {
        this.props.getPicturesByDate(0, []);
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.finish) {
            nextProps.overGetPics(nextProps.pictures);
            this.setState({isLoading:false});
        }
        else
            document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        this.props.reset();
        document.removeEventListener('scroll', this.trackScrolling);
    }
    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight  + 100;
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('app');
        if (this.isBottom(wrappedElement)) {
            this.props.getPicturesByDate(this.props.pageNumber, this.props.pictures);
            document.removeEventListener('scroll', this.trackScrolling);
        }
    };

    render() {
        return (
            <Grid container direction="column" alignItems="center"  className="div-home">
                {this.state.isLoading && <CircularProgress />}
                { !this.state.isLoading && <PictureList isHome={true}/>}
            </Grid>
        );
    }
}

export default Home;
