import { connect } from 'react-redux'
import {State} from "../../reducers";
import {getAllPicturesSortByDate} from "../../actions/Picture/picture";
import { withRouter } from 'react-router-dom';
import {getPictures} from "../../selectors/Home/Home";
import Home from "../../components/Home/Home";
const mapStateToProps = (state: State) => ({
    pictures: getPictures(state),
});

const mapDispatchToProps = {
    getPicturesByDate: getAllPicturesSortByDate
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Home));
