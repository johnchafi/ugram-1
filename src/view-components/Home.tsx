import * as React from 'react'
import {Grid} from "@material-ui/core";
import PictureList from "../containers/PictureList/PictureList";

export interface Props {
}
interface State {
}


class Home extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    render() {
        return (
            <Grid container spacing={24}>
                <PictureList isHome={true}/>
            </Grid>
        );
    }
}

export default Home;
