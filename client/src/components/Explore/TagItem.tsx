import * as React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import {CardActionArea, WithStyles, withStyles} from "@material-ui/core";
import PopularTag from "../../models/PopularTag";
import IconButton from "../Profil/EditProfil";
import * as ReactGA from "react-ga";
export interface Props extends WithStyles<typeof styles>{
    tag: PopularTag
}
interface State {
}


const styles = () => ({
    subheader : {
        fontSize: "10px",
        lineHeight: "1"
    },
    title : {
        fontSize: "13px"
    }
});


class UserItem extends React.Component<Props,State> {

    constructor(props : Props)
    {
        super(props);

    }

    fireEventGA = () => {
        ReactGA.event({
            category: 'Search',
            action: 'Search for tag'
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <Card className={"itemUser"}>
                <Link to={`/tag/${this.props.tag.tag.toLowerCase()}`}  onClick={this.fireEventGA}>
                    <CardActionArea>
                        <CardHeader
                            className={"avatarUserItem"}
                            avatar={
                                <Avatar aria-label="Tag">{this.props.tag.tag.charAt(0)}</Avatar>
                            }
                        />
                        <CardHeader
                            className={"cardBody"}
                            classes={{
                                subheader: classes.subheader,
                                title: classes.title
                            }}
                            title={this.props.tag.tag}
                            subheader={"Nombre de post: " + this.props.tag.count}
                        />
                    </CardActionArea>

                </Link>
            </Card>


        );
    }
}
export default withStyles(styles)(UserItem);
