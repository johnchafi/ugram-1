import { connect } from 'react-redux'
import {State} from "../../reducers";
import {getAllPicturesUser} from "../../actions/PictureList/pictureList";
import { withRouter } from 'react-router-dom';
import {getIsAuthenticated, getPictures} from "../../selectors/PictureList/PictureList";
import PictureList from "../../components/PictureList/PictureList";
const mapStateToProps = (state: State) => ({
    pictures: getPictures(state),
    isAuthenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = {
    getPictures: getAllPicturesUser
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(PictureList));
