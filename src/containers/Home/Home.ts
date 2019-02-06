import { connect } from 'react-redux'
import {State} from "../../reducers";
import {getAllPicturesSortByDate, getUserForPicture} from "../../actions/Picture/picture";
import { withRouter } from 'react-router-dom';
import {getPictures, getStateHome} from "../../selectors/Picture/Picture";
import Home from "../../components/Home/Home";
const mapStateToProps = (state: State) => ({
    pictures: getPictures(state),
    finish:getStateHome(state)
});

const mapDispatchToProps = {
    getPicturesByDate: getAllPicturesSortByDate,
    overGetPics:getUserForPicture
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Home));
