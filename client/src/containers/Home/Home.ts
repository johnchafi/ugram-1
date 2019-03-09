import { connect } from 'react-redux'
import {State} from "../../reducers";
import {getAllPicturesSortByDate, getUserForPicture, reset} from "../../actions/Picture/picture";
import { withRouter } from 'react-router-dom';
import {getPageNumber, getPictures, getStateHome} from "../../selectors/Picture/Picture";
import Home from "../../components/Home/Home";
const mapStateToProps = (state: State) => ({
    pictures: getPictures(state),
    finish:getStateHome(state),
    pageNumber: getPageNumber(state)
});

const mapDispatchToProps = {
    getPicturesByDate: getAllPicturesSortByDate,
    overGetPics:getUserForPicture,
    reset: reset
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Home));
