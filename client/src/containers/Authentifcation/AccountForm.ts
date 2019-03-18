import { connect } from 'react-redux'
import {authUser, createUser} from "../../actions/Authentification/auth";
import {State} from "../../reducers";
import { withRouter } from 'react-router-dom';
import AccountForm from "../../components/Authentification/AccountForm";
import {getMessageError, getStateofStatus, getStatusProfil, getVariantString} from "../../selectors/Profil/Profil";
import {closeStatus} from "../../actions/Status/status";
import {getAuth, getAuthUser, getTokenUser} from "../../selectors/Authentification/auth";
const mapStateToProps = (state: State, ownProps: any) => ({
    message: getMessageError(state),
    variant: getVariantString(state),
    open: getStateofStatus(state),
    status: getStatusProfil(state),
    userid: getAuthUser(state),
    cookies: ownProps.cookies,
    token: getTokenUser(state),
    isAuthenticated: getAuth(state),
});

const mapDispatchToProps = {
    createUser: createUser,
    authUser: authUser,
    closeMessage: closeStatus
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AccountForm));
