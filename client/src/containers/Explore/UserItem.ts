import { connect } from "react-redux";
import {State} from "../../reducers";
import { withRouter } from "react-router-dom";
import UserItem, {Props} from "../../components/Explore/UserItem";
const mapStateToProps = (state: State, ownProps: Props) => ({
    user: ownProps.user,
});

export default withRouter(connect<any, any, any>(mapStateToProps)(UserItem))
