import { connect } from "react-redux";
import {State} from "../../reducers";
import { withRouter } from "react-router-dom";
import {getPictures} from "../../selectors/Picture/Picture";
import PictureList from "../../components/Picture/PictureList";
import {getUserProfil} from "../../selectors/Profil/Profil";
import {getComment, getCommentByPictureIds} from "../../actions/Comment/comment";
import {getLike, getLikeByPictureIds} from "../../actions/Like/like";
import {getNotifications} from "../../actions/Notifications/notifications";
import {getAuthUser} from "../../selectors/Authentification/auth";
import {getPictureComments} from "../../selectors/Picture/Comment/Comment";
import {getPictureLikes} from "../../selectors/Picture/Like/Like";
const mapStateToProps = (state: State) => ({
    pictures: getPictures(state),
    comments: getPictureComments(state),
    likes: getPictureLikes(state),
    user: getUserProfil(state),
    me : getAuthUser(state)
});

const mapDispatchToProps = {
    getComment : getComment,
    getCommentByPictureIds : getCommentByPictureIds,
    getLike : getLike,
    getLikesByPictureIds : getLikeByPictureIds,
    getNotifications : getNotifications,
}

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(PictureList));
