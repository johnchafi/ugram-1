import { connect } from 'react-redux'
import AuthForm from '../../components/Authentification/AuthForm'
import {authUser, authUserGoogle} from "../../actions/Authentification/auth";
import {getAuth, getAuthUser, getTokenUser} from "../../selectors/Authentification/auth";
import {State} from "../../reducers";
import { withRouter } from 'react-router-dom';
import {getMessageError, getStateofStatus, getStatusProfil, getVariantString} from "../../selectors/Profil/Profil";
import {closeStatus} from "../../actions/Status/status";
const mapStateToProps = (state: State, ownProps : any) => ({
    isAuthenticated: getAuth(state),
    user: getAuthUser(state),
    cookies: ownProps.cookies,
    token: getTokenUser(state),
    message: getMessageError(state),
    variant: getVariantString(state),
    open: getStateofStatus(state),
    status: getStatusProfil(state),
});

const mapDispatchToProps = {
    authUserGoogle: authUserGoogle,
    authUser: authUser,
    closeMessage: closeStatus,
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AuthForm));
