import * as React from 'react'
import User from "../../models/User";
import {Card, CardTitle, CardImg, CardBody, Col, NavItem} from "reactstrap";
import {Link} from 'react-router-dom';
export interface Props {
    user : User
}
interface State {
}


class UserItem extends React.Component<Props,State> {

    render() {
        return (
            <Col sm={3}>
                <Card>
                    {this.props.user.pictureUrl && <CardImg top src={this.props.user.pictureUrl} alt="Card image cap" />}
                    {!this.props.user.pictureUrl && <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />}
                    <CardBody>
                        <CardTitle>{this.props.user.firstName} {this.props.user.lastName}</CardTitle>
                        <CardTitle>{this.props.user.email}</CardTitle>
                        <CardTitle>{this.props.user.phoneNumber}</CardTitle>
                        <Link to={'/profil/' + this.props.user.id}> Profil</Link>
                    </CardBody>
                </Card>
            </Col>

        );
    }
}

export default UserItem;
