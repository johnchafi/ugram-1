import { connect } from "react-redux";
import {State} from "../../reducers";
import {getPageNumber, getTags, getUsers} from "../../selectors/Explore/Explore";
import Explore from "../../components/Explore/Explore";
import {getAllUsers, getPopularTags} from "../../actions/Explore/explore";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: State) => ({
    users: getUsers(state),
    tags: getTags(state),
    pageNumber : getPageNumber(state)
});

const mapDispatchToProps = {
    getUsers: getAllUsers,
    getTags: getPopularTags,
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Explore));
