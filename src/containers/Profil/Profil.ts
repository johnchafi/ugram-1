import { connect } from 'react-redux'
import Profil from "../../components/Profil/Profil";
import {getIsAuthenticated, getStatusProfil, getUserProfil} from "../../selectors/Profil/Profil";
import {State} from "../../reducers";
import {profilData} from "../../actions/Profil/profil";
const mapStateToProps = (state: State) => ({
    user: getUserProfil(state),
    status: getStatusProfil(state),
    isAuthenticated: getIsAuthenticated(state)
});

const mapDispatchToProps = {
    getProfil: profilData
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Profil)