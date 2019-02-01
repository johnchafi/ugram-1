import { connect } from 'react-redux'
import {State} from "../../reducers";
import {getIsAuthenticated, getUsers} from "../../selectors/Users/Users";
import Users from "../../components/Users/Users";
import {getAllUsers} from "../../actions/Users/users";
const mapStateToProps = (state: State) => ({
    users: getUsers(state),
    isAuthenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = {
    getUsers: getAllUsers
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Users)
