import { connect } from 'react-redux'
import { getUserProfil} from "../../selectors/Profil/Profil";
import {State} from "../../reducers";
import {closeEdit, editUser} from "../../actions/Profil/profil";
import {withRouter} from 'react-router-dom';
import EditProfil, {Props} from "../../components/Profil/EditProfil";
const mapStateToProps = (state: State, ownProps: Props) => ({
    profil: getUserProfil(state),
});

const mapDispatchToProps = {
    editUser: editUser,
    close: closeEdit
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(EditProfil))
