import { connect } from "react-redux";
import {State} from "../../../reducers";
import { withRouter } from "react-router-dom";
import {deleteComment} from "../../../actions/Comment/comment";
import CommentItem from "../../../components/Picture/Comment/CommentItem";
const mapStateToProps = (state: State, ownProps : any) => ({
    comment: ownProps.comment,
    user : ownProps.user
});

const mapDispatchToProps = {
    deleteComment : deleteComment
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(CommentItem));
