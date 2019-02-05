import { connect } from 'react-redux'
import Profil, {Props} from "../../components/Profil/Profil";
import {getStatusProfil, getUserPicture, getUserProfil} from "../../selectors/Profil/Profil";
import {State} from "../../reducers";
import {profilData} from "../../actions/Profil/profil";
import { withRouter } from 'react-router-dom';
import {getAuth, getAuthUser} from "../../selectors/Authentification/auth";
const mapStateToProps = (state: State) => ({
    user: getUserProfil(state),
    status: getStatusProfil(state),
    isAuthenticated: getAuth(state),
    userid: getAuthUser(state).id,
    pictures:getUserPicture(state)
});

const mapDispatchToProps = {
    getProfil: profilData
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Profil))
