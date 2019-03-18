import { connect } from 'react-redux'
import {checkTokenValidity, getUserWithToken} from "../../actions/Authentification/auth";
import {getAuth, getAuthUser, getTokenUser} from "../../selectors/Authentification/auth";
import {State} from "../../reducers";
import { withRouter } from 'react-router-dom';
import ProtectedRoute from "../../components/Authentification/ProtectedRoute";
import {getStatusProfil} from "../../selectors/Profil/Profil";

const mapStateToProps = (state: State, ownProps : any) => ({
    isAuthenticated: getAuth(state),
    cookies: ownProps.cookies,
    status: getStatusProfil(state),
    token: getTokenUser(state),
    userId: getAuthUser(state),
});

const mapDispatchToProps = {
    authUser: getUserWithToken,
    checkToken: checkTokenValidity
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ProtectedRoute));
