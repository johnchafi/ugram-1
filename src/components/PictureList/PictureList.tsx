import * as React from 'react'
import Picture from "../../models/Picture";
import PictureItem from "../../containers/PictureItem/PictureItem";
import User from "../../models/User";

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

    render() {
        const {pictures, isHome, user } = this.props;
        return (
            pictures && pictures.map(function (picture, i) {
                    return <PictureItem user={isHome && picture.user || !isHome && user} picture={picture} key={picture.id} isHome={isHome}/>
            })
        );
    }
}

export default PictureList;
