import { connect } from 'react-redux'
import {State} from "../../reducers";
import {getAllPicturesSortByDate, getAllPicturesUser} from "../../actions/PictureList/pictureList";
import { withRouter } from 'react-router-dom';
import {getIsAuthenticated, getPictures} from "../../selectors/PictureList/PictureList";
import PictureList, {Props} from "../../components/PictureList/PictureList";
const mapStateToProps = (state: State, ownProps : Props) => ({
    pictures: getPictures(state),
    isAuthenticated: getIsAuthenticated(state),
    isHome: ownProps.isHome,
});

const mapDispatchToProps = {
    getPictures: getAllPicturesUser,
    getPicturesByDate: getAllPicturesSortByDate
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(PictureList));
