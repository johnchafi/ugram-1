import { connect } from "react-redux";
import {State} from "../../reducers";
import Tag from "../../components/Explore/Tags";
import {getAllPicturesByTag} from "../../actions/Explore/tag";
import { withRouter } from "react-router-dom";
const mapStateToProps = (state: State) => ({
});

const mapDispatchToProps = {
    pictures: getAllPicturesByTag
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Tag));
