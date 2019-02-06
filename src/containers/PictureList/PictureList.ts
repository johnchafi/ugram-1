import { connect } from 'react-redux'
import {State} from "../../reducers";
import { withRouter } from 'react-router-dom';
import {getPictures} from "../../selectors/Picture/Picture";
import PictureList from "../../components/PictureList/PictureList";
import {getUserProfil} from "../../selectors/Profil/Profil";
const mapStateToProps = (state: State) => ({
    pictures: getPictures(state),
    user: getUserProfil(state)
});

export default withRouter(connect<any, any, any>(mapStateToProps)(PictureList));
