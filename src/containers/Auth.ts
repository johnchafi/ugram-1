import { connect } from 'react-redux'
import Auth from '../components/Auth'
import {IStateAuthApp} from "../reducers/Auth/auth";
import {authUser} from "../actions/auth";
import {getAuth} from "../selectors/auth";
const mapStateToProps = (state: IStateAuthApp) => ({
    isAuthenticated: getAuth(state)
});

const mapDispatchToProps = {
    handleSubmit: authUser
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Auth)