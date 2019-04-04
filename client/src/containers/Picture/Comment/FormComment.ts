import { connect } from "react-redux";
import {State} from "../../../reducers";
import { withRouter } from "react-router-dom";
import {getAuthUser} from "../../../selectors/Authentification/auth";
import {addComment} from "../../../actions/Comment/comment";
import FormComment from "../../../components/Picture/Comment/FormComment";
const mapStateToProps = (state: State, ownProps : any) => ({
    user: ownProps.user,
    me : getAuthUser(state),
    picture : ownProps.picture
});

const mapDispatchToProps = {
    addComment : addComment
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(FormComment));
