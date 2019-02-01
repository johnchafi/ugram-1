import { connect } from 'react-redux'
import AuthForm from '../../components/Authentification/AuthForm'
import {authUser} from "../../actions/Authentification/auth";
import {getAuth, getAuthUser} from "../../selectors/Authentification/auth";
import {State} from "../../reducers";
const mapStateToProps = (state: State) => ({
    isAuthenticated: getAuth(state),
    user: getAuthUser(state)
});

const mapDispatchToProps = {
    handleSubmit: authUser
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AuthForm)
