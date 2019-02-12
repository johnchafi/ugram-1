import { connect } from 'react-redux'
import Profil from "../../components/Profil/Profil";
import {getMessageError, getStatusProfil, getUserProfil} from "../../selectors/Profil/Profil";
import {State} from "../../reducers";
import {profilData} from "../../actions/Profil/profil";
import { withRouter } from 'react-router-dom';
import {getAuth, getAuthUser} from "../../selectors/Authentification/auth";
import {getNumberOfPost, getPageNumber, getPictures} from "../../selectors/Picture/Picture";
import {getPictureForProfil, resetProfil} from "../../actions/Picture/picture";
const mapStateToProps = (state: State) => ({
    user: getUserProfil(state),
    status: getStatusProfil(state),
    userid: getAuthUser(state).id,
    totalEntries: getNumberOfPost(state),
    pictures:getPictures(state),
    message: getMessageError(state),
    pageNumber: getPageNumber(state)
});

const mapDispatchToProps = {
    getProfil: profilData,
    getPicture: getPictureForProfil,
    reset: resetProfil
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Profil))
