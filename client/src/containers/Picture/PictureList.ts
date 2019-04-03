import { connect } from "react-redux";
import {State} from "../../reducers";
import { withRouter } from "react-router-dom";
import {getPictures} from "../../selectors/Picture/Picture";
import PictureList from "../../components/Picture/PictureList";
import {getUserProfil} from "../../selectors/Profil/Profil";
import {getComment} from "../../actions/Comment/comment";
const mapStateToProps = (state: State) => ({
    pictures: getPictures(state),
    user: getUserProfil(state)
});

const mapDispatchToProps = {
    getComment : getComment
}

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(PictureList));
