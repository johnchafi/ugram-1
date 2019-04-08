import { connect } from "react-redux";
import {State} from "../../reducers";
import { withRouter } from "react-router-dom";
import {getAuth} from "../../selectors/Authentification/auth";
import NavBar from "../../view-components/NavBar";
import {getNotificationsUser} from "../../selectors/Notifications/notifications";
import {setNotificationRead} from "../../actions/Notifications/notifications";
const mapStateToProps = (state: State, ownProps: any) => ({
    cookies: ownProps.cookies,
    isAuthenticated: getAuth(state),
    notifications : getNotificationsUser(state)
});

const mapDispatchToProps = {
    setNotificationRead : setNotificationRead
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(NavBar))
