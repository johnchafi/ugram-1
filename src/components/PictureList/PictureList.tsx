import * as React from 'react'
import Picture from "../../models/Picture";
import PictureItem from "../../containers/PictureItem/PictureItem";

export interface Props {
    pictures: Picture[],
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
        this.state = {
            username: '',
            password: ''
        };
    }


    render() {d
        const {pictures, isHome } = this.props;
        return (
            pictures && pictures.map(function (picture, i) {
                console.log(picture);
                console.log("picture == " + JSON.stringify(picture));
                console.log("picture.user ==" + JSON.stringify(picture.user));
                    return <PictureItem user={picture.user} picture={picture} key={i} isHome={isHome}/>
            })
        );
    }
}

export default PictureList;
