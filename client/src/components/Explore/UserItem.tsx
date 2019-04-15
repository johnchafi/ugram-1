import * as React from 'react'
import User from "../../models/User";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import {Button, CardActionArea, CardActions, CardContent, Typography, WithStyles, withStyles} from "@material-ui/core";
import Helper from "../../helper/helper";
export interface Props extends WithStyles<typeof styles>{
    user : User,
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

    render() {
        const {classes} = this.props;
        return (
            <Card className={"itemUser"}>
                <Link to={`/profil/${this.props.user.id}`}>
                    <CardActionArea>
                            <CardHeader
                                className={"avatarUserItem"}
                                avatar={
                                    <Avatar aria-label="Recipe" src={this.props.user.pictureUrl}>
                                    </Avatar>
                                }
                            />
                            <CardHeader
                                className={"cardBody"}
                                classes={{
                                    subheader: classes.subheader,
                                    title: classes.title
                                }}
                                title={this.props.user.firstName + " " + this.props.user.lastName}
                                subheader={"Inscrit depuis le " + Helper.getPrettyDate(this.props.user.registrationDate)}
                            />
                    </CardActionArea>

                </Link>
            </Card>


        );
    }
}
export default withStyles(styles)(UserItem);
