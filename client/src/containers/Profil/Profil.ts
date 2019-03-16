import { connect } from 'react-redux'
import Profil from "../../components/Profil/Profil";
import {
    getMessageError,
    getStateofStatus,
    getStatusProfil,
    getUserProfil,
    getVariantString
} from "../../selectors/Profil/Profil";
import {State} from "../../reducers";
import {profilData} from "../../actions/Profil/profil";
import { withRouter } from 'react-router-dom';
import {getAuthUser} from "../../selectors/Authentification/auth";
import {getNumberOfPost, getPageNumber, getPictures} from "../../selectors/Picture/Picture";
import {getPictureForProfil, resetProfil} from "../../actions/Picture/picture";
import {closeStatus} from "../../actions/Status/status";
const mapStateToProps = (state: State, ownProps : any) => ({
    user: getUserProfil(state),
    status: getStatusProfil(state),
    userid: getAuthUser(state),
    totalEntries: getNumberOfPost(state),
    pictures:getPictures(state),
    message: getMessageError(state),
    variant: getVariantString(state),
    pageNumber: getPageNumber(state),
    open: getStateofStatus(state),
    cookies: ownProps.cookies
});

const mapDispatchToProps = {
    getProfil: profilData,
    getPicture: getPictureForProfil,
    reset: resetProfil,
    closeMessage: closeStatus
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Profil))
