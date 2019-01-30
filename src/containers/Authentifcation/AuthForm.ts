import { connect } from 'react-redux'
import AuthForm from '../../components/Authentification/AuthForm'
import {IStateAuthApp} from "../../reducers/Authentifcation/auth";
import {authUser} from "../../actions/Authentification/auth";
import {getAuth} from "../../selectors/Authentification/auth";
const mapStateToProps = (state: IStateAuthApp) => ({
    isAuthenticated: getAuth(state)
});

const mapDispatchToProps = {
    handleSubmit: authUser
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AuthForm)