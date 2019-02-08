import * as React from 'react'
import Picture from "../../models/Picture";
import User from "../../models/User";
import PictureItemProfil from "../../containers/Picture/PictureItemProfil";
import PictureItemHome from "../../containers/Picture/PictureItemHome";

export interface Props {
    pictures: Picture[],
    user: User
    isHome:boolean
}
interface State {
}


class PictureList extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
    }

    componentWillMount(): void {
    }

    componentWillUnmount(): void {

    }

    render() {
        const {pictures, isHome, user } = this.props;
        return (
            pictures && pictures.map(function (picture, i) {
                if (isHome)
                    return (<PictureItemHome user={isHome && picture.user || !isHome && user} picture={picture} key={picture.id} isHome={isHome}/>);
                else
                    return (
                            <PictureItemProfil user={isHome && picture.user || !isHome && user} picture={picture} key={picture.id} isHome={isHome}/>)
            })
        );
    }
}

export default PictureList;
