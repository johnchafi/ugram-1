import { connect } from 'react-redux'
import {getUserWithToken} from "../../actions/Authentification/auth";
import {getAuth, getMessageErrorAuth} from "../../selectors/Authentification/auth";
import {State} from "../../reducers";
import { withRouter } from 'react-router-dom';
import ProtectedRoute from "../../components/Authentification/ProtectedRoute";

const mapStateToProps = (state: State, ownProps : any) => ({
    isAuthenticated: getAuth(state),
    cookies: ownProps.cookies,
    message: getMessageErrorAuth(state),
});

const mapDispatchToProps = {
    authUser: getUserWithToken
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ProtectedRoute));
