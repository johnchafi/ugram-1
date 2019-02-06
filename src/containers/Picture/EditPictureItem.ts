import { connect } from 'react-redux'
import {State} from "../../reducers";
import { withRouter } from 'react-router-dom';
import {Props} from "../../components/Picture/EditPictureItem";
import {editPicture} from "../../actions/Picture/picture";
import EditPictureItem from "../../components/Picture/EditPictureItem";
const mapStateToProps = (state: State, ownProps: Props) => ({
    picture: ownProps.picture,
    open: ownProps.open
});


const mapDispatchToProps = {
    editPicture: editPicture,
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(EditPictureItem));
