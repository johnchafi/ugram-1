import * as React from 'react'
import {Grid} from "@material-ui/core";
import Picture from "../../models/Picture";
import PictureItem from "../PictureItem/PictureItem";

export interface Props {
    isAuthenticated: boolean
    pictures: Picture[],
    getPictures: (string) => any
    userid: string,
    match: {params : {id: string}}
    location:{pathname:string}
}
interface State {
}


class PictureList extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.props.getPictures(this.props.match.params.id);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.location.pathname !== this.props.location.pathname)
            this.props.getPictures(nextProps.match.params.id);
    }

    render() {
        const{pictures} = this.props;
        return (
            <div>
                <Grid container spacing={24}>
                    {pictures.map(function(picture, i){
                        return <PictureItem picture={picture} key={i}/>
                    })}
                </Grid>
            </div>
        );
    }
}

export default PictureList;
