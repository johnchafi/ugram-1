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

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});


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
                    return <PictureItemHome user={isHome && picture.user || !isHome && user} picture={picture} key={picture.id} isHome={isHome}/>;
                else
                    return (
                            <PictureItemProfil user={isHome && picture.user || !isHome && user} picture={picture} key={picture.id} isHome={isHome}/>)
            })
        );
    }
}

export default PictureList;
