import * as React from 'react'
import PictureItemProfil from "../../containers/Picture/PictureItemProfil";
import PictureItemHome from "../../containers/Picture/PictureItemHome";
import Props from "../../Props/PictureList";
import Picture from "../../models/Picture";

interface State {
}


class PictureList extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
    }

    componentWillMount(): void {
        this.props.getNotifications(this.props.me);
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
        const {pictures, isHome, user, isMe } = this.props;
        return (
            pictures && pictures.map(function (picture, i) {

                if (isHome)
                    return (<PictureItemHome user={isHome ? picture.user : user} picture={picture} key={picture.id} isHome={isHome}/>);
                else
                    return (
                            <PictureItemProfil user={isHome ? picture.user : user} isMe={isMe} picture={picture} key={picture.id} isHome={isHome}/>)
            })
        );
    }
}

export default PictureList;
