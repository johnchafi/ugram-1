import * as React from 'react'
import User from "../../models/User";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {WithStyles, withStyles} from "@material-ui/core";
export interface Props extends WithStyles<typeof styles>{
    user : User,
}
interface State {
}


const styles = () => ({
    card: {
        minWidth:200,
        maxWidth: 400,
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
            <Grid item xs md={4} lg={3}>
                <Link to={`/profil/${this.props.user.id}`}>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" src={this.props.user.pictureUrl}>

                                </Avatar>
                            }
                            title={this.props.user.firstName + " " + this.props.user.lastName}
                            subheader={new Date(Number(this.props.user.registrationDate)).toDateString()}
                        />
                    </Card>
                </Link>
            </Grid>

        );
    }
}
export default withStyles(styles)(UserItem);
