import * as React from 'react'
import {Avatar, CircularProgress, Grid, Typography} from "@material-ui/core";
import Picture from "../../models/Picture";

export interface Props {
    isAuthenticated: boolean,
    tag: string,
    count: number,
    pictures: Picture[]
}
interface State {
}

class Tags extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount(): void {
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    }

    render() {
        return (
            <div style={{maxWidth:935 , margin:"auto"}}>
                <Typography>IN TAGS COMPONENT</Typography>
                <Grid container direction="row" justify="center" alignItems="center" className="ProfilHeader">
                    <Grid item xs={4}>
                        <Avatar style={{ margin: 'auto' }}>{this.props.tag.charAt(0)}</Avatar>
                    </Grid>
                    {
                    <Grid item xs={8} className="containerProfil">
                        <Grid container alignItems="center">
                            <Typography component="h1" variant="h4">
                                {this.props.tag}
                            </Typography>
                        </Grid>
                        <div style={{margin:20}}>
                            <Grid container spacing={40}>
                                <Typography variant="subtitle1">
                                    <b>{this.props.count}</b> posts
                                </Typography>
                            </Grid>
                        </div>
                    </Grid>
                    || <CircularProgress/>}
                </Grid>

            </div>
        );
    }
}

export default Tags;
