import { connect } from "react-redux";
import {State} from "../../../reducers";
import { withRouter } from "react-router-dom";
import {getAuthUser} from "../../../selectors/Authentification/auth";
import {getLoadLike, getPictureLikes} from "../../../selectors/Picture/Like/Like";
import Likes from "../../../components/Picture/Like/Like";
import {addLike, deleteLike} from "../../../actions/Like/like";
const mapStateToProps = (state: State, ownProps : any) => ({
    user: getAuthUser(state),
    load: getLoadLike(state),
    likes: getPictureLikes(state),
    picture : ownProps.picture
});

const mapDispatchToProps = {
    addLike : addLike,
    deleteLike: deleteLike
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Likes));
