import * as React from 'react'
import User from "../../models/User";
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {red} from "@material-ui/core/colors";
import {withStyles} from "@material-ui/core";
export interface Props {
    user : User,
    classes:PropTypes.object.isRequired
}
interface State {
}


const styles = theme => ({
    card: {
        minWidth:200,
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});


class UserItem extends React.Component<Props,State> {

    constructor(props : Props)
    {
        super(props);

    }

    render() {
        const {classes} = this.props;
        return (
            <Grid item xs={12} md={4} lg={3}>
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
