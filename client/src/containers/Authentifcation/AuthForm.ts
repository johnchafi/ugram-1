import { connect } from 'react-redux'
import AuthForm from '../../components/Authentification/AuthForm'
import {authUser} from "../../actions/Authentification/auth";
import {getAuth, getAuthUser} from "../../selectors/Authentification/auth";
import {State} from "../../reducers";
import { withRouter } from 'react-router-dom';
const mapStateToProps = (state: State) => ({
    isAuthenticated: getAuth(state),
    user: getAuthUser(state),
    token:
});

const mapDispatchToProps = {
    authUser: authUser
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AuthForm));
