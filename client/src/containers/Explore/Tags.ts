import { connect } from "react-redux";
import {State} from "../../reducers";
import Tags from "../../components/Explore/Tags";
import {getAllPicturesByTag} from "../../actions/Explore/tag";
import { withRouter } from "react-router-dom";
import {getPictures, getTagName} from "../../selectors/Explore/Tag";
import {getComment, getCommentByPictureIds} from "../../actions/Comment/comment";
import {getLike, getLikeByPictureIds} from "../../actions/Like/like";
import {getNotifications} from "../../actions/Notifications/notifications";
import {getPictureComments} from "../../selectors/Picture/Comment/Comment";
import {getPictureLikes} from "../../selectors/Picture/Like/Like";

const mapStateToProps = (state: State) => ({
    pictures: getPictures(state),
    tag: getTagName(state),
    comments: getPictureComments(state),
    likes: getPictureLikes(state),
});

const mapDispatchToProps = {
    getPictures: getAllPicturesByTag,
    getComment : getComment,
    getCommentByPictureIds : getCommentByPictureIds,
    getLike : getLike,
    getLikesByPictureIds : getLikeByPictureIds,
    getNotifications : getNotifications,
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Tags));
