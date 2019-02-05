import { connect } from 'react-redux'
import {State} from "../../reducers";
import { withRouter } from 'react-router-dom';
import {getPictures} from "../../selectors/Home/Home";
import PictureList from "../../components/PictureList/PictureList";
const mapStateToProps = (state: State) => ({
    pictures: getPictures(state),
});

export default withRouter(connect<any, any, any>(mapStateToProps)(PictureList));
