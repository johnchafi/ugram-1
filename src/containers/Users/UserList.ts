import { connect } from 'react-redux'
import {State} from "../../reducers";
import {getIsAuthenticated, getUsers} from "../../selectors/Users/UserList";
import UserList from "../../components/Users/UserList";
import {getAllUsers} from "../../actions/User/users";
import { withRouter } from 'react-router-dom';
const mapStateToProps = (state: State) => ({
    users: getUsers(state),
    isAuthenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = {
    getUsers: getAllUsers
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(UserList));
