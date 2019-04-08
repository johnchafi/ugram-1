import { connect } from "react-redux";
import {State} from "../../reducers";
import { withRouter } from "react-router-dom";
import {deletePicture} from "../../actions/Picture/picture";
import PictureItemHome, {Props} from "../../components/Picture/PictureItemHome";
import {addComment} from "../../actions/Comment/comment";
import {getAuthUser} from "../../selectors/Authentification/auth";
const mapStateToProps = (state: State, ownProps: Props) => ({
    picture: ownProps.picture,
    user: ownProps.user,
    me : getAuthUser(state),
    isHome: ownProps.isHome
});

const mapDispatchToProps = {
    deletePicture: deletePicture,
    addComment : addComment,
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(PictureItemHome))
