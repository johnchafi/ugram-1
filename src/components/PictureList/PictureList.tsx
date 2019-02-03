import * as React from 'react'
import {Grid} from "@material-ui/core";
import Picture from "../../models/Picture";
import PictureItem from "../PictureItem/PictureItem";

export interface Props {
    isAuthenticated: boolean
    pictures: Picture[],
    getPictures: (string) => any
    getPicturesByDate: () => any
    match: {params : {id: string}}
    location:{pathname:string}
    isHome:boolean
}
interface State {
}


class PictureList extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        if (!this.props.isHome)
            this.props.getPictures(this.props.match.params.id);
        else
            this.props.getPicturesByDate();
        this.state = {
            username: '',
            password: ''
        };
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            if (!this.props.isHome)
                this.props.getPictures(this.props.match.params.id);
            else
                this.props.getPicturesByDate();
        }
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
