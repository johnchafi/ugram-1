import * as React from 'react'
import {Avatar, CircularProgress, Grid, Typography} from "@material-ui/core";
import Picture from "../../models/Picture";
import PictureItemProfil from "../../containers/Picture/PictureItemProfil";
import {Comment} from "../../models/Comment";
import {Like} from "../../models/Like";

export interface Props {
    isAuthenticated: boolean,
    tag: string,
    pictures: Picture[],
    getPictures: (pageNumberPictures : number, tag : string) => any,
    match: {params : {tag: string}},
    getComment : () => any
    getCommentByPictureIds : (comment : Comment[], pictureIds : number[]) => any
    getLikesByPictureIds : (like : Like[], pictureIds : number[]) => any
    getLike : () => any
    comments : Comment[]
    likes : Like[]

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
        this.props.getPictures(0, this.props.match.params.tag);
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.pictures !== this.props.pictures) {
            let ids : number[] = [];
            nextProps.pictures.map(function (picture : Picture) {
                ids.push(picture.id);
            }.bind(ids));
            this.props.getCommentByPictureIds(this.props.comments, ids);
            this.props.getLikesByPictureIds(this.props.likes, ids);
        }
    }

    render() {
        const {pictures} = this.props;
        return (
            <div style={{maxWidth:935 , margin:"auto"}}>
                <Grid container direction="row" justify="center" alignItems="center" className="ProfilHeader">
                    <Grid item xs={4}>
                        {
                            this.props.tag &&
                            <Avatar style={{ margin: 'auto' }}>{this.props.tag.charAt(0)}</Avatar>
                        }
                    </Grid>
                    <Grid item xs={8} className="containerProfil">
                        <Grid container alignItems="center">
                            <Typography component="h1" variant="h4">
                                {this.props.tag}
                            </Typography>
                        </Grid>
                        <div style={{margin:20}}>
                            <Grid container spacing={40}>
                                <Typography variant="subtitle1">
                                    {/*<b>{this.props.count}</b> posts*/}
                                </Typography>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>

                <Grid container>
                    {
                        pictures && pictures.map(function (picture, i) {
                            return <PictureItemProfil user={picture.user} isMe={false} picture={picture} key={picture.id} isHome={false}/>
                        })
                    }
                </Grid>

            </div>
        );
    }
}

export default Tags;
