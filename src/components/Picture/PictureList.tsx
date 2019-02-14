import * as React from 'react'
import PictureItemProfil from "../../containers/Picture/PictureItemProfil";
import PictureItemHome from "../../containers/Picture/PictureItemHome";
import Props from "../../Props/PictureList";

interface State {
}


class PictureList extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
    }

    render() {
        const {pictures, isHome, user } = this.props;
        return (
            pictures && pictures.map(function (picture, i) {

                if (isHome)
                    return (<PictureItemHome user={isHome ? picture.user : user} picture={picture} key={picture.id} isHome={isHome}/>);
                else
                    return (
                            <PictureItemProfil user={isHome ? picture.user : user} picture={picture} key={picture.id} isHome={isHome}/>)
            })
        );
    }
}

export default PictureList;
